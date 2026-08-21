"use client";

import { useState, type SubmitEvent } from "react";

export default function ContactForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("general");
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [errorMsg, setErrorMsg] = useState("");

    async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        setStatus("loading");
        setErrorMsg("");

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/contact/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, subject, message }),
            });

            if (!res.ok) {
                const data = await res.json().catch(() => ({}));
                const firstError = Object.values(data)[0];
                setErrorMsg(
                    Array.isArray(firstError) ? firstError[0] : "Something went wrong. Please try again."
                );
                setStatus("error");
                return;
            }

            setStatus("success");
            setName("");
            setEmail("");
            setSubject("general");
            setMessage("");
        } catch {
            setErrorMsg("Something went wrong. Please try again.");
            setStatus("error");
        }
    }

    if (status === "success") {
        return (
            <div className="max-w-md bg-surface-container-lowest p-8 rounded-lg shadow-[0_10px_40px_rgba(176,42,80,0.04)] border border-[#F9EAE1] text-center">
                <p className="font-body-lg text-body-lg text-on-surface">
                    Thanks for reaching out — we&apos;ll get back to you shortly.
                </p>
            </div>
        );
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-8 max-w-md bg-surface-container-lowest p-8 rounded-lg shadow-[0_10px_40px_rgba(176,42,80,0.04)] border border-[#F9EAE1]"
        >
            <div className="relative group pt-4">
                <input
                    className="w-full bg-transparent border-0 border-b border-[#F9EAE1] pb-2 pt-2 text-on-surface font-body-md focus:outline-none focus:border-primary focus:ring-0 transition-colors peer"
                    id="name"
                    name="name"
                    required
                    type="text"
                    placeholder=" "
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <label
                    className="absolute left-0 top-6 text-on-secondary-container font-label-sm text-label-sm transition-all duration-300 peer-focus:-top-1 peer-focus:text-primary peer-focus:text-[0.75rem] peer-[&:not(:placeholder-shown)]:-top-1 peer-[&:not(:placeholder-shown)]:text-primary peer-[&:not(:placeholder-shown)]:text-[0.75rem] pointer-events-none"
                    htmlFor="name"
                >
                    Name
                </label>
            </div>

            <div className="relative group pt-4">
                <input
                    className="w-full bg-transparent border-0 border-b border-[#F9EAE1] pb-2 pt-2 text-on-surface font-body-md focus:outline-none focus:border-primary focus:ring-0 transition-colors peer"
                    id="email"
                    name="email"
                    required
                    type="email"
                    placeholder=" "
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label
                    className="absolute left-0 top-6 text-on-secondary-container font-label-sm text-label-sm transition-all duration-300 peer-focus:-top-1 peer-focus:text-primary peer-focus:text-[0.75rem] peer-[&:not(:placeholder-shown)]:-top-1 peer-[&:not(:placeholder-shown)]:text-primary peer-[&:not(:placeholder-shown)]:text-[0.75rem] pointer-events-none"
                    htmlFor="email"
                >
                    Email Address
                </label>
            </div>

            <div className="relative pt-4 mb-4">
                <label className="font-label-sm text-label-sm text-on-secondary-container mb-2 block" htmlFor="subject">
                    Subject
                </label>
                <select
                    className="w-full bg-transparent border-0 border-b border-[#F9EAE1] pb-2 pt-2 text-on-surface font-body-md focus:outline-none focus:border-primary focus:ring-0 transition-colors"
                    id="subject"
                    name="subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                >
                    <option value="general">General Inquiry</option>
                    <option value="wholesale">Wholesale</option>
                    <option value="press">Press & Media</option>
                    <option value="support">Customer Support</option>
                </select>
            </div>

            <div className="relative pt-4">
                <label className="font-label-sm text-label-sm text-on-secondary-container mb-2 block" htmlFor="message">
                    Message
                </label>
                <textarea
                    className="w-full bg-transparent border-0 border-b border-[#F9EAE1] pb-2 pt-2 text-on-surface font-body-md focus:outline-none focus:border-primary focus:ring-0 transition-colors resize-none"
                    id="message"
                    name="message"
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
            </div>

            {status === "error" && (
                <p className="text-red-600 text-xs">{errorMsg}</p>
            )}

            <button
                className="bg-primary-container text-on-primary font-label-sm text-label-sm rounded-full px-8 py-4 w-full md:w-auto hover:shadow-lg hover:-translate-y-[1px] transition-all duration-300 min-h-[48px] flex items-center justify-center gap-2 disabled:opacity-50"
                type="submit"
                disabled={status === "loading"}
            >
                {status === "loading" ? "Sending..." : "Send Message"}
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
        </form>
    );
}