import { Link } from "react-router-dom";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

function NotFound() {
  return (
    <div className="flex items-center min-h-screen px-4 py-12 sm:px-6 md:px-8 lg:px-12 xl:px-16">
      <div className="w-full space-y-6 text-center">
        <div className="space-y-3">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
            {"Oops! Lost in Cyberspace"}
          </h1>
          <p className="text-gray-500">
            {"Looks like you've ventured into the unknown digital realm."}
          </p>
        </div>
        <div className="flex flex-col gap-y-2">
          <div>
            <Link
              to="/product"
              className={cn(
                buttonVariants({ variant: "default" }),
                "w-[180px]"
              )}
            >
              {"Return to Home"}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
