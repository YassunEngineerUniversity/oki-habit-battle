import { Card } from "@/components/ui/card";
import LogoutButton from "./component/LogoutButton";

const Index = () => {
  return (
    <Card className="border border-gray-200 shadow-none px-4 py-8 gap-1">
      <div>
        <p>ログアウトしても、再度ログインすることで引き続きサービスをご利用いただけますのでご安心ください。</p>
        <p>ログアウトボタンを押すことでログアウトされます。</p>
      </div>
      <div>
        <LogoutButton />
      </div>
    </Card>
  );
}
export default Index;