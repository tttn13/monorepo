## Software Architecture
### System Context diagram
![System Context](https://zucal-public.s3.us-east-1.amazonaws.com/SystemContext+(1).jpg)

### Container diagram
![Container](https://zucal-public.s3.us-east-1.amazonaws.com/Container.jpg)

## Tech
### Front end
- NextJS 
- Typescript
- Zustand
- TailwindCSS
- DaisyUI
### Back end
- Node
- Typescript
- Koa 
### Database
- Postgres
- Prisma - ORM tool
### File storage 
- S3-compatible storage service : Minio 
- AWS s3 in production
### Deployment
- [Docker](https://www.docker.com/) : containerized and created separate image for front and back end
- [Render](https://render.com/) : backend
- [Vercel](https://vercel.com/) : front end
- [Neon](https://neon.tech/) : Postgres db