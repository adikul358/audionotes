interface TabBarProps {
	tabs: {
		label: string | React.ReactNode,
		key: string,
		onClick: (key: string) => void
	}[],
	activeTab: string,
	className?: string,
	tabClassName?: string
}

const TabBar: React.FC<TabBarProps> = ({tabs, activeTab, className, tabClassName}) => {
	return (
		<div className={className}>
			{tabs.map(({key, label, onClick}) => (
				<span 
					key={key}
					className={`flex items-center cursor-pointer px-3 py-1 rounded-t-lg transition-colors ease-in duration-100 ${tabClassName} ${activeTab == key ? "bg-blue-800 text-white" : "hover:bg-gray-200"}`} 
					onClick={() => onClick(key)}
				>
					{label}
				</span>
			))}
		</div>
	)
}

export default TabBar