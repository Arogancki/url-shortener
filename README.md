## Url shortener

### Start with

```
docker-compose up
```

### Valid url example

[protocol]://phost].[domain]/[optional-path]
eg. https://cloud.mongodb.com/v2/

### Not implemented

Add support for accounts so people can view the URLs they created
Allow users to modify the slug of their URL

I havent have enough time to implement this.
to implement user managment / auth I'd use https://docs.nestjs.com/security/authentication
For modifiing url codes, simple endpoint with auth guard for owning the resource
