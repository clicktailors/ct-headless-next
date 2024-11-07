"use client";

import { useEffect, useState } from "react";
import usePageTracking from "../../hooks/usePageTracking";

export default function PageTracker() {
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) return null;

	usePageTracking();
	return null;
}
