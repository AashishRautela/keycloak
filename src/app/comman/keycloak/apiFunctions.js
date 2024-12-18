import axios from 'axios';

const base_url = 'http://localhost:8180';

export const loginSuperAdmin = async (username, password) => {
  try {
    const response = await axios.post(
      `${base_url}/realms/master/protocol/openid-connect/token`,
      new URLSearchParams({
        grant_type: 'password',
        client_id: 'admin-cli',
        username: username,
        password: password,
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    const accessToken = response.data.access_token;

    sessionStorage.setItem('superAdminToken', accessToken);

    console.log('Super Admin login successful. Token saved in session storage.');
  } catch (error) {
    console.error('Error logging in Super Admin:', error.response ? error.response.data : error.message);
  }
};

export const getAllRealms = async ( ) => {
  const token = await getAdminToken();
  if (!token) {
    console.error('Failed to obtain admin token.');
    return;
  }

  try {
    const response = await axios.get(
      `${base_url}/admin/realms`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    console.log('response.data', response.data)
    return response.data;
  } catch (error) {
    console.error('Error fetching realms:', error.response ? error.response.data : error.message);
  }
};

export const getAdminToken = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8180/realms/master/protocol/openid-connect/token',
        new URLSearchParams({
          grant_type: 'password',
          client_id: '12345',
          username: 'ashish',  
          password: 'Ashish@123',
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );
  
      return response.data.access_token;
    } catch (error) {
      console.error('Error obtaining admin token:', error.response ? error.response.data : error.message);
      throw error;
    }
  };
  
  export const createRealm = async (realmName, organizationDetails) => {
    try {
      const token = await getAdminToken();
  
      const realmPayload = {
        realm: realmName,
        enabled: true,
        attributes: {
          organizationName: organizationDetails.organizationName || realmName,
          numberOfEmployees: organizationDetails.numberOfEmployees || '0',
          organizationType: organizationDetails.organizationType || 'Private',
          industry: organizationDetails.industry || 'General',
          registrationDate: organizationDetails.registrationDate || new Date().toISOString(),
          contactEmail: organizationDetails.contactEmail || 'contact@example.com',
          contactPhone: organizationDetails.contactPhone || '+0000000000',
          address: organizationDetails.address || 'Not provided',
          city: organizationDetails.city || 'Not provided',
          country: organizationDetails.country || 'Not provided',
          website: organizationDetails.website || 'https://example.com',
          createdBy: organizationDetails.createdBy || 'admin',
          createdAt: organizationDetails.createdAt || new Date().toISOString(),
          updatedAt: organizationDetails.updatedAt || new Date().toISOString(),
          status: organizationDetails.status || 'active',
          description: organizationDetails.description || 'No description provided',
        },
      };
  
      const response = await axios.post(
        'http://localhost:8180/admin/realms',
        realmPayload,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
  
      console.log(`Realm "${realmName}" created successfully with custom attributes!`);
      return response.data;
    } catch (error) {
      console.error('Error creating realm:', error.response ? error.response.data : error.message);
    }
  };

  export const getRealmDetails = async (realmName) => {
    try {
      const token = await getAdminToken();
  
      if (!token) {
        console.error('Failed to retrieve admin token.');
        return;
      }
  
      const response = await axios.get(
        `${base_url}/admin/realms/${realmName}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
  
      console.log(`Realm "${realmName}" details:`, response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching realm details:', error.response ? error.response.data : error.message);
    }
  };
