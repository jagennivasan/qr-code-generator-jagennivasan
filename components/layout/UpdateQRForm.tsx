"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface UpdateQRProps {
  id: string;
}

export default function UpdateQR({ id }: UpdateQRProps) {
  const router = useRouter();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    profileImage: "",
    mobile: "",
    email: "",
    website: "",
    company: "",
    street: "",
    city: "",
    zip: "",
    country: "",
    pageColor: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isFetching, setIsFetching] = useState(true);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          setFormData((prev) => ({
            ...prev,
            profileImage: reader.result as string,
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    const fetchQRData = async () => {
      try {
        const response = await fetch(`/api/vcard-data/${id}`, {
          cache: "no-store",
        });
        if (!response.ok) {
          throw new Error("Failed to fetch QR code data.");
        }
        const data = await response.json();
        setFormData({
          name: data.name || "",
          profileImage: "", //
          mobile: data.mobile || "",
          email: data.email || "",
          website: data.website || "",
          company: data.company || "",
          street: data.street || "",
          city: data.city || "",
          zip: data.zip || "",
          country: data.country || "",
          pageColor: data.pageColor || "",
        });
      } catch (err: any) {
        setError(err.message || "An error occurred while fetching data.");
      } finally {
        setIsFetching(false);
      }
    };

    fetchQRData();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`/api/vcard-data/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, ...formData }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to update QR code data.");
      }

      if (!response.ok) {
        toast({
          title: "update Failed",
          description: "Failed to update content. Please try again.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Updated Successful",
          description: "You have successfully updated the content.",
          className: "bg-orange-700 text-white",
        });
        router.push("/dashboard");
        router.refresh();
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid place-content-center h-screen m-5">
      <form
        onSubmit={handleSubmit}
        className=" md:w-[800px]   items-center  space-y-4 p-4 border rounded-lg "
      >
        <h2 className="text-lg font-bold">Update QR Code</h2>

        {error && <p className="text-red-500">{error}</p>}

        <div className="grid gap-4 sm:grid-cols-2 ">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <Label htmlFor="mobile">Mobile</Label>
            <Input
              type="tel"
              id="mobile"
              name="mobile"
              value={formData.mobile}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              type="text"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <Label htmlFor="website">Website</Label>
            <Input
              type="text"
              id="website"
              name="website"
              value={formData.website}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <Label htmlFor="company">Company</Label>
            <Input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <Label htmlFor="pageColor">Page Color</Label>
            <Input
              type="color"
              id="pageColor"
              name="pageColor"
              value={formData.pageColor}
              className="w-20"
              onChange={handleInputChange}
            />
          </div>

          <div className="">
            <Label htmlFor="street">Street Address</Label>
            <Input
              type="text"
              id="street"
              name="street"
              value={formData.street}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <Label htmlFor="city">City</Label>
            <Input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <Label htmlFor="zip">ZIP Code</Label>
            <Input
              type="text"
              id="zip"
              name="zip"
              value={formData.zip}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <Label htmlFor="country">Country</Label>
            <Input
              type="text"
              id="country"
              name="country"
              value={formData.country}
              onChange={handleInputChange}
            />
          </div>

          <div className="sm:col-span-2">
            <Label htmlFor="profileImage">Profile Image</Label>
            <Input
              type="file"
              id="profileImage"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
        </div>

        <Button type="submit" variant={"default"}>
          Update vcard
        </Button>
      </form>
    </div>
  );
}
