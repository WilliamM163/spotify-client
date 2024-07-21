// login_api.js
const clientId = '2ef60a6a1ca94d4f86b4f82b869cd940';
const params = new URLSearchParams(window.location.search);
const code = params.get("code");
 async function authenticate() {
    if (!code) {
        redirectToAuthCodeFlow(clientId);
    } else {
        const { accessToken, refreshToken } = await getAccessToken(clientId, code);
        if (accessToken) {
            // Store the refresh token securely
            localStorage.setItem("refresh_token", refreshToken);
            localStorage.setItem("access_token", accessToken);
            localStorage.removeItem("verifier"); // Clear verifier after use
            return accessToken;
        } else {
            console.error("Failed to get access token");
            return null;
        }
    }
}


async function redirectToAuthCodeFlow(clientId) {
    localStorage.removeItem("verifier"); // Ensure no old verifier is used

    const verifier = generateCodeVerifier(128);
    const challenge = await generateCodeChallenge(verifier);

    localStorage.setItem("verifier", verifier);

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("response_type", "code");
    params.append("redirect_uri", "http://localhost:5173");
    params.append("scope", "user-read-private user-read-email");
    params.append("code_challenge_method", "S256");
    params.append("code_challenge", challenge);

    document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
}

function generateCodeVerifier(length) {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

async function generateCodeChallenge(codeVerifier) {
    const data = new TextEncoder().encode(codeVerifier);
    const digest = await window.crypto.subtle.digest('SHA-256', data);
    return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
}

async function getAccessToken(clientId, code) {
    const verifier = localStorage.getItem("verifier");

    if (!verifier) {
        console.error("Code verifier not found in local storage");
        return { accessToken: null, refreshToken: null };
    }

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("redirect_uri", "http://localhost:5173");
    params.append("code_verifier", verifier);

    try {
        const result = await fetch("https://accounts.spotify.com/api/token", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: params
        });

        if (!result.ok) {
            const data = await result.json();
            console.error('Error response:', data);
            return { accessToken: null, refreshToken: null };
        }

        const data = await result.json();
        return {
            accessToken: data.access_token,
            refreshToken: data.refresh_token
        };
    } catch (error) {
        console.error('Fetch error:', error);
        return { accessToken: null, refreshToken: null };
    }
}
 async function refreshAccessToken() {
    const refreshToken = localStorage.getItem("refresh_token");

    if (!refreshToken) {
        console.error("Refresh token not found in local storage");
        return null;
    }

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("grant_type", "refresh_token");
    params.append("refresh_token", refreshToken);

    try {
        const result = await fetch("https://accounts.spotify.com/api/token", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: params
        });

        if (!result.ok) {
            const data = await result.json();
            console.error('Error response:', data);
            return null;
        }

        const data = await result.json();
        localStorage.setItem("access_token", data.access_token);
        return data.access_token;
    } catch (error) {
        console.error('Fetch error:', error);
        return null;
    }
}

export { authenticate, refreshAccessToken }; // Named exp