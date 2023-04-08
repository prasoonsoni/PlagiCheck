import { useState } from "react";
import { FormControl, Input, Button } from "@chakra-ui/react";

export default function Bottombar({id, user}) {
  const [input, setInput] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();
    // await addDoc(collection(db, `chats/${id}/messages`), {
    //   text: input,
    //   sender: user.email,
    //   timestamp: serverTimestamp()
    // })
    setInput("");
  }

  return (
    <FormControl
      p={3}
      onSubmit={sendMessage}
      as="form"
    >
      <Input placeholder="Type a message..." autoComplete="off" onChange={e => setInput(e.target.value)} value={input} />
      <Button type="submit" hidden>Submit</Button>
    </FormControl>
  )
}