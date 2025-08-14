import { request } from 'undici';

interface NitroConfig {
  baseUrl: string;
  apiKey: string;
}

const nitroConfig: NitroConfig = {
  baseUrl: process.env.NITRO_BASE_URL || 'https://api.nitro.com.br/v1',
  apiKey: process.env.NITRO_API_KEY || '',
};

export async function nitroRequest<T>(
  endpoint: string,
  options: {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
    body?: any;
  } = {}
): Promise<T> {
  const { method = 'GET', body } = options;

  const response = await request(`${nitroConfig.baseUrl}${endpoint}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${nitroConfig.apiKey}`,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.body) {
    throw new Error('Resposta vazia da API Nitro');
  }

  const data = (await response.body.json()) as T;
  return data;
}

export default nitroConfig;
