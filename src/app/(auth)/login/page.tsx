"use client";

import {
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function Page() {
  // states
  const [isShow, setIsShow] = useState<boolean>(false);

  return (
    <section>
      <div className="w-full h-screen flex px-10 gap-10 items-center">
        <div className="w-1/2 py-10">
          <div className="flex flex-col w-3/5 gap-3">
            <Typography variant="h4" fontWeight={700}>
              Login
            </Typography>
            <Typography>See your growth and get support!</Typography>
            <form className="mt-10">
              <div className="flex flex-col items-start gap-3">
                <TextField
                  fullWidth
                  type="text"
                  name="email"
                  label="Email"
                  placeholder="exmaple@gmail.com"
                />
                <span></span>
                <TextField
                  fullWidth
                  type={isShow ? "text" : "password"}
                  name="password"
                  label="Password"
                  placeholder="*******"
                  slotProps={{
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={() => setIsShow(!isShow)}>
                            {isShow ? (
                              <Visibility color="inherit" />
                            ) : (
                              <VisibilityOff color="inherit" />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    },
                  }}
                />
                <div className="flex justify-between items-center w-full">
                  <FormControlLabel
                    label="Remember Me"
                    control={<Checkbox />}
                  />
                  <Typography className="!underline">
                    Forgot Password?
                  </Typography>
                </div>
                <Button variant="contained" fullWidth>
                  Login
                </Button>
              </div>
            </form>
          </div>
        </div>
        <div className="w-1/2">
          <Image
            src={"/login.png"}
            width={500}
            height={500}
            className="mix-blend-multiply w-full h-auto object-contain"
            alt="Login"
          />
        </div>
      </div>
    </section>
  );
}
