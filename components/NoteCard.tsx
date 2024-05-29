"use client"

import Link from 'next/link';
import moment from 'moment';
import { useState } from 'react';
import TabBar from '@/components/TabBar';

interface NoteCardProps {
  id: string
  title: string,
  date: Date,
  summary?: string,
  transcript?: string
}

const NoteCard: React.FC<NoteCardProps> = ({
  id,
  title,
  date,
  summary,
  transcript
}) => {
  
  const formatDate = (date: Date) => {
    const dateWrapper = moment(date)
    return dateWrapper.format("D MMM YYYY")
  }

  const [tab, setTab] = useState("summary")
  const tabs = [
		{
			key: "summary",
			label: "Summary",
			onClick: (key: string) => setTab(key),
		},
		{
			key: "transcript",
			label: "Transcript",
			onClick: (key: string) => setTab(key),
		},
	]

  return (
      <div className="w-full p-4 border-2 border-gray-400 rounded-lg hover:border-blue-800 transition-colors ease-in duration-100">
				<Link href={`/app/note/${id}`}>
					<h1 className="text-xl font-semibold hover:text-blue-700 transition-colors ease-in duration-100">{title}</h1>
				</Link>
				<span className="text-gray-500 font-medium">{formatDate(date)}</span>
				<TabBar tabs={tabs} activeTab={tab} className="flex flex-row mt-6" />
				<p className="line-clamp-3 mt-3 text-gray-700 text-sm mb-3">
					{tab == "summary" && summary}
					{tab == "transcript" && transcript}
				</p>
			</div>
  )
}

export default NoteCard