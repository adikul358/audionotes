"use client"

import checkUnlocked from "@/utils/supabase/checkUnlocked"
import Link from "next/link"
import { useState } from "react"
import { PlusIcon, FolderIcon, ChatIcon } from "./Icons"

export default function SideNav({unlocked}: {unlocked: boolean}) {
	function handleMagicChat() {
		if (!unlocked) {
			alert("Magic Chat is a paid feature. Please pay to unlock all features.")
		}
	}

	return (
		<nav className="absolute top-0 bottom-0 left-0 flex flex-col justify-center items-center px-3 space-y-3">
			<Link href="/app">
				<div className="flex items-center justify-center w-12 h-12 rounded-lg bg-blue-800 text-white">
					<PlusIcon className="size-[30px]"/>
				</div>
			</Link>
			<Link href="/app/notes">
				<div className="flex items-center justify-center w-12 h-12 rounded-lg bg-blue-800 text-white">
					<FolderIcon className="size-[30px]"/>
				</div>
			</Link>
			<Link href={unlocked ? "/app/chat" : ""} onClick={handleMagicChat}>
				<div className="flex items-center justify-center w-12 h-12 rounded-lg bg-blue-800 text-white">
					<ChatIcon className="size-[30px]"/>
				</div>
			</Link>
		</nav>
	)
}