import { callApi } from "@/utils/callApi"
import Image from "next/image"
import StampsGallery from "./component/StampsGallery"

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