import { useEffect, useRef } from "react"
import tw, { styled } from "twin.macro"
import SyntaxHighlighter from "react-syntax-highlighter"
import { anOldHope } from "react-syntax-highlighter/dist/esm/styles/hljs"

export default function Feed({ feed }) {
  //* Scroll to Last Message
  const lastMessage = useRef()

  useEffect(() => {
    const timeout = setTimeout(
      () =>
        lastMessage.current &&
        lastMessage.current.scrollIntoView({ behavior: "smooth" }),
      20
    )
    return () => clearTimeout(timeout)
  }, [feed])

  return (
    <StyledFeed>
      {feed?.map(({ fromSelf, message }, index) => {
        const isLastMessage = index === feed.length - 1
        const splitMessage = message.split("```")
        return splitMessage.map((msg, index) => {
          if (index % 2 === 0) {
            if (!msg) return null
            return (
              <Message
                key={index}
                ref={isLastMessage ? lastMessage : undefined}
                fromSelf={fromSelf}
              >
                {msg}
              </Message>
            )
          } else {
            return (
              <CodeWrapper fromSelf={fromSelf}>
                <CodeContainer fromSelf={fromSelf}>
                  <SyntaxHighlighter language="javascript" style={anOldHope}>
                    {msg}
                  </SyntaxHighlighter>
                </CodeContainer>
              </CodeWrapper>
            )
          }
        })
      })}
    </StyledFeed>
  )
}

const StyledFeed = tw.div`h-[40rem] overflow-y-auto px-10 py-4 [&::-webkit-scrollbar]:(w-1 bg-[#080420] rounded-xl) flex flex-col [&::-webkit-scrollbar-thumb]:(bg-[#997ae5]/50 rounded-xl hover:(bg-[#997af0]))`
const Message = styled.div(({ fromSelf }) => [
  tw`text-white flex gap-4 mb-4 whitespace-pre-wrap rounded-t-xl p-4 [width: fit-content;] max-w-[80%]`,
  fromSelf
    ? tw`self-end bg-blue-800 rounded-l-xl`
    : tw`self-start bg-[#997ae5] rounded-r-xl`,
])
const CodeWrapper = styled.div(({ fromSelf }) => [
  tw`[width: fit-content;]  max-w-[80%] mb-4`,
  fromSelf && tw`ml-auto`,
])
const CodeContainer = styled.div(({ fromSelf }) => [
  tw`rounded-t-xl overflow-hidden`,
  fromSelf ? tw`self-end rounded-l-xl` : tw`self-start rounded-r-xl`,
])
