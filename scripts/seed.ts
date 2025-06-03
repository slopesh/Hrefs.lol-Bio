import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'
import { nanoid } from 'nanoid'

const prisma = new PrismaClient()

async function main() {
  // Create admin user
  const adminPassword = await hash('admin123', 12)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@href.lol' },
    update: {},
    create: {
      email: 'admin@href.lol',
      password: adminPassword,
      username: 'admin',
      name: 'Admin User',
      isAdmin: true,
      isVerified: true,
    },
  })

  console.log('Created admin user:', admin.email)

  // Create initial invite codes
  const inviteCodes = await Promise.all(
    Array.from({ length: 10 }, async () => {
      const code = nanoid(8)
      return prisma.inviteCode.create({
        data: {
          code,
          createdById: admin.id,
        },
      })
    })
  )

  console.log('Created invite codes:', inviteCodes.map(ic => ic.code))

  // Create some default badges
  const badges = await Promise.all([
    prisma.badge.create({
      data: {
        name: 'Developer',
        description: 'Early developer of href.lol',
        icon: '💻',
        color: '#3B82F6',
      },
    }),
    prisma.badge.create({
      data: {
        name: 'Premium',
        description: 'Premium user with exclusive features',
        icon: '⭐',
        color: '#F59E0B',
      },
    }),
    prisma.badge.create({
      data: {
        name: 'Staff',
        description: 'href.lol staff member',
        icon: '👨‍💼',
        color: '#10B981',
      },
    }),
  ])

  console.log('Created badges:', badges.map(b => b.name))
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 