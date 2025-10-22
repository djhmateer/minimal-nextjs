import Link from 'next/link'

export const dynamic = 'force-static'

export default function OldPage() {
  return (
    <div className="max-w-3xl mx-auto pt-8 px-8">
      <h1 className="text-3xl font-bold mb-6">Old page links - may be useful</h1>

      <ul className="space-y-2">
        <li>
          <Link href="/users" className="text-blue-600 hover:underline" prefetch={false}>
            Users
          </Link>
        </li>
        <li>
          <Link href="/simpleform" className="text-blue-600 hover:underline" prefetch={false}>
            Simple Form
          </Link>
        </li>
        <li>
          <Link href="/simpleformclient" className="text-blue-600 hover:underline" prefetch={false}>
            Simple Form Client
          </Link>
        </li>
        <li>
          <Link href="/shadcnb" className="text-blue-600 hover:underline" prefetch={false}>
            shadcn/ui Demo
          </Link>
        </li>
        <li>
          <Link href="/crudb" className="text-blue-600 hover:underline" prefetch={false}>
            CRUD-B Tasks
          </Link>
        </li>
        <li>
          <Link href="/crudd" className="text-blue-600 hover:underline" prefetch={false}>
            CRUD-D Tasks (1M rows)
          </Link>
        </li>
      </ul>
    </div>
  )
}