interface ChatExchange {
  from: "prompt" | "reply"
  text: string
}

interface ChatAsideProps {
  exchanges: ChatExchange[]
}

export function ChatAside({ exchanges }: ChatAsideProps) {
  return (
    <div className="flex flex-col gap-3 font-sans text-sm">
      {exchanges.map((exchange, index) => (
        <div
          key={index}
          className={`max-w-xs rounded-2xl px-4 py-2.5 ${
            exchange.from === "prompt"
              ? "self-start bg-card text-muted-foreground rounded-bl-sm"
              : "self-end bg-secondary text-foreground rounded-br-sm"
          }`}
        >
          {exchange.text}
        </div>
      ))}
    </div>
  )
}
