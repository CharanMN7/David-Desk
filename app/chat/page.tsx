import { RocketIcon } from "lucide-react";
import { PageLayout } from "../components/layouts/page-layout/PageLayout";

const ChatScreen = () => {
  return (
    <PageLayout heading="Chat">
      {/* Chat Screen that looks like ChatGPT's chat interface. Code for the complete chat interface using tailwind css goes below: */}
      <div className="chat-screen">
        <div className="chat-box">
          <div className="chat-bubble user">
            <p>I need help with my DBMS exam prep</p>
          </div>
          <div className="chat-bubble bot">
            <p>Okay! What do you want to revise?</p>
          </div>
          <div className="chat-bubble user">
            <p>Can you explain the concept of normalization?</p>
          </div>
          <div className="chat-bubble bot">
            <p>
              Normalization is the process of organizing data in a database.
              This includes creating tables and establishing relationships.
              There are three main forms of normalization: First, Second, and
              Third.
              <ol>
                <li>
                  <strong>First Normal Form (1NF):</strong> Each column in a
                  table must be atomic, meaning it cannot be further divided.
                </li>
                <li>
                  <strong>Second Normal Form (2NF):</strong> The table must be
                  in 1NF and all non-key attributes must be fully dependent on
                  the primary key.
                </li>
                <li>
                  <strong>Third Normal Form (3NF):</strong> The table must be in
                  2NF and all non-key attributes must be dependent only on the
                  primary key.
                </li>
              </ol>
              For example, in a table of employees, the employee ID should be
              the primary key, and the name, age, and department should be
              dependent on the employee ID.
            </p>
          </div>
        </div>
        <div className="chat-input">
          <input type="text" placeholder="Type your message..." />
          <button>
            <RocketIcon></RocketIcon>
          </button>
        </div>
      </div>
    </PageLayout>
  );
};
export default ChatScreen;
