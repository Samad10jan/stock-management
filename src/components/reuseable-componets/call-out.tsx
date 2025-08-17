import { InfoCircledIcon } from "@radix-ui/react-icons";
import { Callout } from "@radix-ui/themes";

export default function CallOutMessage({message}:{
    message:string|null
}) {
     console.log(message?.length==0);
     console.log(message);
     
    
    if(message?.length==0) return null
   
    return (
        <Callout.Root variant="outline">
            <Callout.Icon>
                <InfoCircledIcon />
            </Callout.Icon>
            <Callout.Text>
                {message}
                
            </Callout.Text>
        </Callout.Root>
    )
}