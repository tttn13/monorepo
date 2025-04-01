import axios from 'axios';
import { userDbService } from './user.service';
import dotenv from 'dotenv';
dotenv.config();
export const auth0Service = {
    async getGoogleTokenFromAuth0(id: number) {
        try {
            const user = await userDbService.getUser(id);
            console.log(`authId is ${user?.authId}`)
            console.log('AUTH0_DOMAIN:', process.env.AUTH0_DOMAIN);

            const managementApiToken = await this.getManagementApiToken();
            console.log(`managementApiToken is ${managementApiToken}`)
            // Then use Management API to get user's identity with Google access token
            const response = await axios.get(
                `https://${process.env.AUTH0_DOMAIN}/api/v2/users/${user?.authId}`,
                {
                    headers: {
                        Authorization: `Bearer ${managementApiToken}`
                    }
                }
            );

            const googleIdentity = response.data.identities.find(
                (identity: { provider: string; }) => identity.provider === 'google-oauth2'
            );

            if (!googleIdentity || !googleIdentity.access_token) {
                return null;
            }
            console.log(`googleIdentity.access_token is ${googleIdentity.access_token}`)
            return googleIdentity.access_token;
        } catch (error) {
            console.error('Error getting Google token:', error);
            return null;
        }
    },
    async getManagementApiToken() {
        try {
            const response = await axios.post(
                `https://${process.env.AUTH0_DOMAIN}/oauth/token`,
                {
                    client_id: process.env.AUTH0_CLIENT_ID,
                    client_secret: process.env.AUTH0_CLIENT_SECRET,
                    audience: `https://${process.env.AUTH0_DOMAIN}/api/v2/`,
                    grant_type: 'client_credentials'
                }
            );

            return response.data.access_token;
        } catch (error) {
            console.error('Error getting management API token:', error);
            throw error;
        }
    },
}