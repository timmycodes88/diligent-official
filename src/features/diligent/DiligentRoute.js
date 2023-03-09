import { redirect } from "react-router-dom"

export const diligentLoader = async () => {
  //* If there is a user logged in, direct to /
  const user = localStorage.getItem("chat-app-user")
  if (!user) return redirect("/login")

  //* If No Avatar Image is Set, direct to /setAvatar
  const { isAvatarImageSet } = await JSON.parse(
    localStorage.getItem("chat-app-user")
  )
  if (!isAvatarImageSet) return redirect("/setAvatar")

  return null
}
