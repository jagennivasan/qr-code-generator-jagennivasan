// 'use client';

// import { useRouter } from "next/navigation";
// import { MdDelete } from "react-icons/md";

// export default function Removeqr({ id }: { id: number }) {
//   const router = useRouter();

//   const removeqr = async () => {
//     const confirmed = confirm("Are you sure you want to delete this QR code?");
//     if (confirmed) {
//       try {
//         const res = await fetch(`/api/edit-qr-image/${id}`, {
//           method: "DELETE",
//         });

//         if (res.ok) {
//           router.refresh(); // This will refresh the current page and update data
//         } else {
//           const { message } = await res.json();
//           alert(`Failed to delete QR code: ${message}`);
//         }
//       } catch (error) {
//         console.error("Error deleting QR code:", error);
//         alert("An unexpected error occurred while deleting the QR code.");
//       }
//     }
//   };

//   return (
//     <button onClick={removeqr}>
//       <MdDelete size={25} className="text-red-600" />
//     </button>
//   );
// }


'use client';

import { redirect,useRouter } from "next/navigation";
import { MdDelete } from "react-icons/md";
import { useToast } from "@/hooks/use-toast";

export default function Removeqr({ id }: { id: number }) {
  const router = useRouter();
  const { toast } = useToast();

  const removeqr = async () => {
    // const confirmed = confirm("Are you sure you want to delete this QR code and its associated data?");
    // if (!confirmed) return;

    try {
      // Delete QR Code
      const qrResponse = await fetch(`/api/qr-image/${id}`, {
        method: "DELETE",
      });
      if (!qrResponse.ok) {
        const { error } = await qrResponse.json();
        alert(`Failed to delete QR Code: ${error}`);
        return;
      }

      // Delete User Data
      const userResponse = await fetch(`/api/vcard-data/${id}`, {
        method: "DELETE",
      });
      if (!userResponse.ok) {
        const { error } = await userResponse.json();
        alert(`Failed to delete User Data: ${error}`);
        return;
      }

      const urlResponse = await fetch(`/api/shorten-url/${id}`, {
        method: "DELETE",
      });
      if (!urlResponse.ok) {
        const { error } = await urlResponse.json(); // Corrected here
        alert(`Failed to delete URL Data: ${error}`);
        return;
      }
      if (!qrResponse.ok) {
        toast({
          title: "update Failed",
          description: "Failed to delete QRCode. Please try again.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Deleted Successful",
          description: "You have successfully Deleted the QRCode.",
          className:"bg-orange-700 text-white"
        });
        router.refresh();
      } 

    } catch (error) {
      console.error("Error deleting data:", error);
      alert("An unexpected error occurred while deleting the data.");
    }
  };

  return (
    <button onClick={removeqr} className="flex cursor-pointer hover:text-red-600">
      <MdDelete size={24} /> <span>Delete</span>
    </button>
  );
}
