import ConversationalChat from '../ConversationalChat';

export default function ConversationalChatExample() {
  return (
    <div className="h-96">
      <ConversationalChat
        onAction={(action, data) => console.log('Action:', action, data)}
      />
    </div>
  );
}
