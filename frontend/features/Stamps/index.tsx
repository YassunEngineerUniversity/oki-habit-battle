import { callApi } from "@/utils/callApi"
import StampsGallery from "./components/StampsGallery"

const Index = async () => {
  const stamps = await callApi("/stamps/me", {
    method: "GET",
  })

  return (
    <>
      <StampsGallery stamps={stamps?.data} />
    </>
  )
}

export default Index