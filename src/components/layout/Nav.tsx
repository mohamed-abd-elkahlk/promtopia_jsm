"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import {
  signIn,
  signOut,
  useSession,
  getProviders,
  ClientSafeProvider,
  LiteralUnion,
} from "next-auth/react";
import { BuiltInProviderType } from "next-auth/providers/index";
const Nav = () => {
  const { data: session } = useSession();
  const [provider, setProvider] = useState<Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null>(null);
  const [toggleDropDown, setToggleDropDown] = useState(false);
  useEffect(() => {
    const setProviders = async () => {
      const res = await getProviders();

      setProvider(res);
    };
    setProviders();
  }, []);
  return (
    <nav className="flex-between w-full mb-16 pt-3 ">
      <Link href={"/"} className="flex gap-2 flex-center">
        <Image
          src={"/assets/images/logo.svg"}
          alt="logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text">Promtopia</p>
      </Link>
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href={"create-prompt"} className="black_btn">
              Create Post
            </Link>
            <button
              type="button"
              onClick={async () =>
                await signOut({ redirect: true, callbackUrl: "/" })
              }
              className="outline_btn"
            >
              Sign Out
            </button>
            <Link href={"/profile"}>
              <Image
                src={session?.user?.image || "/assets/images/logo.png"}
                alt="profile"
                width={37}
                height={37}
                className="rounded-full"
              ></Image>
            </Link>
          </div>
        ) : (
          <>
            {provider &&
              Object.values(provider).map((provid) => (
                <button
                  type="button"
                  key={provid.name}
                  onClick={() => signIn(provid.id)}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>

      {/* Mobile Nav */}

      <div
        className="sm:hidden flex relative"
        onClick={() => setToggleDropDown((prev) => !prev)}
      >
        {session?.user ? (
          <div className="flex">
            <Image
              src={session?.user?.image || "/assets/images/logo.png"}
              alt="profile"
              width={37}
              height={37}
              className="rounded-full"
            ></Image>
            {toggleDropDown && (
              <div className="dropdown">
                <Link
                  href={"/profile"}
                  className="dropdown_link"
                  onClick={() => setToggleDropDown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href={"/create-prompt"}
                  className="dropdown_link"
                  onClick={() => setToggleDropDown(false)}
                >
                  Create Prompt
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setToggleDropDown(false);
                    signOut({ redirect: true, callbackUrl: "/" });
                  }}
                  className="mt-5 w-full black_btn"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {provider &&
              Object.values(provider).map((provid) => (
                <button
                  type="button"
                  key={provid.name}
                  onClick={() => signIn(provid.id)}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
