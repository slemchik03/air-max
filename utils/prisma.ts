import { PrismaClient } from "@prisma/client"

let prisma: PrismaClient

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient({ datasources: {  db: { url: process.env.DATABASE_URL } } })
} else {
  // @ts-ignore
  if (!global.prisma) {
     // @ts-ignore
    global.prisma = new PrismaClient()
  }
 // @ts-ignore
  prisma = global.prisma
}

export default prisma