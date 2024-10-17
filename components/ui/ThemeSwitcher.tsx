import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { styles } from "../../lib/styles";
import { SunIcon, MoonIcon, SystemIcon } from "../images/tsx/icons";

const ThemeSwitcher = () => {
	const [mounted, setMounted] = useState(false);
	const { theme, setTheme } = useTheme();

	useEffect(() => {
		setMounted(true);
		if (!theme) {
			setTheme("system");
		}
	}, [theme, setTheme]);

	if (!mounted) {
		return null;
	}

	const toggleTheme = () => {
		if (theme === "system") {
			setTheme("light");
		} else if (theme === "light") {
			setTheme("dark");
		} else {
			setTheme("system");
		}
	};

	return (
		<button
			onClick={toggleTheme}
			className={`p-2 rounded-full ${styles.icon}`}
			aria-label="Toggle theme"
		>
			{theme === "system" ? (
				<SystemIcon />
			) : theme === "light" ? (
				<SunIcon />
			) : (
				<MoonIcon />
			)}
		</button>
	);
};

export default ThemeSwitcher;
