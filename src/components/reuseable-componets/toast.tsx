// "use client";
// import * as React from "react";
// import * as RadixToast from "@radix-ui/react-toast";

// // ✅ Hook to use toast
// export function useToast() {
//   const [message, setMessage] = React.useState<string | null>(null);

//   function showToast(msg: string) {
//     setMessage(msg);
//   }

//   const ToastContainer = (
//     <RadixToast.Provider swipeDirection="right" >
//       <RadixToast.Root
//         open={!!message}
//         onOpenChange={(open) => !open && setMessage(null)}
//         className=" fixed bottom-5 right-5  rounded-md bg-white px-4 py-3 shadow-lg border border-gray-200 data-[state=open]:animate-slideIn data-[state=closed]:animate-hide data-[swipe=end]:animate-swipeOut"
//       >
//         <RadixToast.Title className="font-medium text-gray-900">
//           Notification
//         </RadixToast.Title>
//         <RadixToast.Description className="text-sm text-gray-600">
//           {message}
//         </RadixToast.Description>
//       </RadixToast.Root>
//       <RadixToast.Viewport className="fixed bottom-4 right-4 z-[2147483647] w-[320px] max-w-[100vw] outline-none" />
//     </RadixToast.Provider>
//   );

//   return { showToast, ToastContainer };
// }
