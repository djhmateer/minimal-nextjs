// putting in nothing forces auto, which is static, which is what we want
export const dynamic = 'force-dynamic'

import { Button } from "@/components/ui/button"

export default async function ShadcnPage() {
  console.log('shadcn page')
  return (
    <div>
      <Button>Click me</Button>
    </div>
  )
}