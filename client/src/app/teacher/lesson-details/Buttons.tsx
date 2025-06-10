'use client'
import React from "react";
import { Button } from "../../components/admin-panel/ui/button";

function Buttons() {
  return (
    <div className="flex flex-col gap-2 p-5 justify-center">
      <Button color="lime" className=" text-white md:py-2.5">
        Join from here
      </Button>
      <Button
        color="button_primary"
        className="bg-admin_button text-white md:py-2.5"
      >
        Send message
      </Button>
      <Button color="red" className="text-white md:py-2.5">
        Cancel
      </Button>
    </div>
  );
}

export default Buttons;
