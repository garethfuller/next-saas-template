type Config = {
  appName: string
  appUrl: string
  companyName: string
  companyAddress: string
}

export const config: Config = {
  appName: 'My SaaS App',
  appUrl: process.env.NEXT_PUBLIC_APP_URL || 'https://myapp.com',
  companyName: 'SaaS App LTD',
  companyAddress: '123 SaaS St, SaaS City, SaaS State, SaaS Country',
}
