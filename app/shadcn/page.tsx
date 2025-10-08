// putting in nothing forces auto, which is static, which is what we want
// export const dynamic = 'force-static'

import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div>
      <Button>Click me</Button>
    </div>
  )
}