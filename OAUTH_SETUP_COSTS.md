# OAuth Provider Setup Costs - Research Summary

## TL;DR: All OAuth Providers are FREE for basic usage

### Twitch OAuth
- **Cost**: 100% FREE
- **Registration**: https://dev.twitch.tv/console
- **Limits**: 
  - Rate limits apply (800 points per minute for most endpoints)
  - No cost for OAuth app registration
  - No cost for user authentication
- **Requirements**: Twitch account (free)
- **Best for**: Gaming/streaming audience

### YouTube/Google OAuth 2.0
- **Cost**: FREE tier available
- **Registration**: https://console.cloud.google.com/apis/credentials
- **Limits**:
  - 10,000 quota units per day (free tier)
  - OAuth user authentication: unlimited free
  - YouTube Data API has quota costs per operation
- **Requirements**: Google account (free)
- **Note**: May require credit card for verification but won't be charged
- **Best for**: General audience, YouTube creators

### Kick OAuth
- **Cost**: 100% FREE (currently)
- **Registration**: https://kick.com/developer/apps
- **Limits**: 
  - No documented rate limits for OAuth
  - Still in early developer stage
- **Requirements**: Kick account (free)
- **Best for**: Alternative streaming platform users

## Cost Comparison Summary

| Provider | Registration | OAuth Auth | API Calls | Best For |
|----------|---------------|------------|-----------|----------|
| Twitch | Free | Free | Rate limited | Gaming/streaming |
| YouTube/Google | Free | Free | 10k quota/day | General audience |
| Kick | Free | Free | Unknown limits | Alternative platform |

## Recommendation

**Start with Twitch** because:
1. Largest streaming audience
2. Most mature OAuth implementation
3. Well-documented API
4. Your target users likely have Twitch accounts

**Add YouTube second** for broader reach

**Add Kick third** as an alternative option

## Setup Steps

### 1. Twitch (Recommended First)
1. Create Twitch account at https://twitch.tv
2. Go to https://dev.twitch.tv/console
3. Register new application
4. Set OAuth Redirect URL: `http://localhost:3000/api/oauth/callback`
5. Copy Client ID and Secret to `.env`

### 2. YouTube/Google (Second)
1. Go to https://console.cloud.google.com/apis/credentials
2. Create new project
3. Enable YouTube Data API v3
4. Create OAuth 2.0 credentials (Web application)
5. Add redirect URI: `http://localhost:3000/api/oauth/callback`
6. Copy Client ID and Secret to `.env`

### 3. Kick (Third)
1. Create Kick account at https://kick.com
2. Go to https://kick.com/developer/apps
3. Create new app
4. Set redirect URI: `http://localhost:3000/api/oauth/callback`
5. Copy Client ID and Secret to `.env`

## Local Development

For local development without OAuth credentials, the app will still work but login will fail gracefully. You can:

1. Skip OAuth setup for initial development
2. Use the app in read-only mode
3. Add OAuth later when ready for user authentication

## Production Considerations

- **Twitch**: No changes needed for production
- **YouTube**: May need to verify app for >100 users
- **Kick**: Still early stage, monitor for changes

All three are completely free for the scale of a new voting site.
