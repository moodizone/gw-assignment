"use client";
import * as React from "react";
import { Terminal } from "lucide-react";
import { ErrorBoundary } from "react-error-boundary";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

function ErrorBoundaryProvider({ children }: React.PropsWithChildren) {
  return (
    <ErrorBoundary
      fallbackRender={({ error }) => {
        return (
          <div className="h-full w-full flex justify-center items-center px-4">
            <Card className="w-full max-w-md mx-auto shadow-lg">
              <CardHeader className="flex items-center">
                <Terminal className="h-8 w-8" />
                <CardTitle className="text-lg font-bold text-center mt-2">
                  {"Something went wrong!"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Alert variant="destructive">
                  <AlertTitle>{"Error"}</AlertTitle>
                  <AlertDescription>
                    <p className="text-sm text-muted-foreground">
                      {
                        "An unexpected error occurred. Please try refreshing the page."
                      }
                    </p>
                  </AlertDescription>
                </Alert>
                <code className="block bg-muted p-3 rounded-md mt-4 text-sm break-words">
                  {error?.message}
                </code>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Button
                className="w-full"
                  onClick={() => {
                    window.location.reload();
                  }}
                >
                  {"Refresh Page"}
                </Button>
              </CardFooter>
            </Card>
          </div>
        );
      }}
    >
      {children}
    </ErrorBoundary>
  );
}

export default ErrorBoundaryProvider;
