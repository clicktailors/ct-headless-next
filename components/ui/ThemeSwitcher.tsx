import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { styles } from "../../lib/styles";
import { SunIcon, MoonIcon, SystemIcon } from "../images/tsx/icons";

const ThemeSwitcher = () => {
	const [mounted, setMounted] = useState(false);
	const { theme, setTheme } = useTheme();

	// useEffect only runs on the client, so now we can safely show the UI
	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return null;
	}

	const toggleTheme = () => {
		if (theme === "dark") {
			setTheme("light");
		} else if (theme === "light") {
			setTheme("system");
		} else {
			setTheme("dark");
		}
	};

	return (
		<button
			onClick={toggleTheme}
			className={`p-2 rounded-full ${styles.icon}`}
			aria-label="Toggle theme"
		>
			{theme === "dark" ? (
				<MoonIcon />
			) : theme === "light" ? (
				<SunIcon />
			) : (
				<SystemIcon />
			)}
		</button>
	);
};

export default ThemeSwitcher;
