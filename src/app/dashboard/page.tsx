import { redirect } from "next/navigation"
import { auth } from "../../../auth"

const DashboardPage = async () => {
    const session = await auth()
    console.log(session)
  return (
    <div>DashboardPage</div>
  )
}

export default DashboardPage