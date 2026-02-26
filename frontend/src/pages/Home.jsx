import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Home() {
    const { user } = useAuth();

    return (
        <div className="text-gray-800 dark:text-gray-100">

            {/* HERO SECTION */}
            <section className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-28 px-6">
                <div className="max-w-5xl mx-auto text-center">

                    <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                        Connect. Volunteer. <br /> Make Impact.
                    </h1>

                    <p className="text-lg md:text-xl max-w-2xl mx-auto mb-10 text-blue-100">
                        Discover meaningful opportunities, track your contributions,
                        and collaborate with organizations that care about your community.
                    </p>

                    <div className="flex justify-center gap-5">
                        {!user ? (
                            <>
                                <Link
                                    to="/register"
                                    className="bg-white text-blue-700 px-7 py-3 rounded-lg font-medium shadow-lg hover:scale-105 transition"
                                >
                                    Get Started
                                </Link>

                                <Link
                                    to="/login"
                                    className="border border-white px-7 py-3 rounded-lg hover:bg-white hover:text-blue-700 transition"
                                >
                                    Login
                                </Link>
                            </>
                        ) : (
                            <Link
                                to="/dashboard"
                                className="bg-white text-blue-700 px-7 py-3 rounded-lg font-medium shadow-lg hover:scale-105 transition"
                            >
                                Go to Dashboard
                            </Link>
                        )}
                    </div>

                </div>
            </section>

            {/* FEATURES SECTION */}
            <section className="py-24 px-6 bg-gray-50 dark:bg-slate-900">
                <div className="max-w-6xl mx-auto">

                    <h2 className="text-3xl font-bold text-center mb-16">
                        Why Choose VolunteerHub?
                    </h2>

                    <div className="grid md:grid-cols-3 gap-10">

                        {/* Card 1 */}
                        <div className="p-8 rounded-xl bg-gradient-to-br from-blue-100 to-blue-200 dark:from-slate-800 dark:to-slate-700 shadow-md hover:shadow-xl transition text-center">
                            <div className="text-4xl mb-4">🔍</div>
                            <h3 className="text-xl font-semibold mb-3 text-blue-800 dark:text-blue-400">
                                Smart Matching
                            </h3>
                            <p className="text-gray-700 dark:text-gray-300">
                                Find opportunities aligned with your skills, interests,
                                and availability.
                            </p>
                        </div>

                        {/* Card 2 */}
                        <div className="p-8 rounded-xl bg-gradient-to-br from-green-100 to-green-200 dark:from-slate-800 dark:to-slate-700 shadow-md hover:shadow-xl transition text-center">
                            <div className="text-4xl mb-4">📊</div>
                            <h3 className="text-xl font-semibold mb-3 text-green-800 dark:text-green-400">
                                Impact Tracking
                            </h3>
                            <p className="text-gray-700 dark:text-gray-300">
                                Track your volunteer hours and measure your contribution
                                to the community.
                            </p>
                        </div>

                        {/* Card 3 */}
                        <div className="p-8 rounded-xl bg-gradient-to-br from-purple-100 to-purple-200 dark:from-slate-800 dark:to-slate-700 shadow-md hover:shadow-xl transition text-center">
                            <div className="text-4xl mb-4">💬</div>
                            <h3 className="text-xl font-semibold mb-3 text-purple-800 dark:text-purple-400">
                                Real-Time Collaboration
                            </h3>
                            <p className="text-gray-700 dark:text-gray-300">
                                Communicate seamlessly with organizations
                                and fellow volunteers.
                            </p>
                        </div>

                    </div>
                </div>
            </section>

            {/* CTA SECTION */}
            <section className="py-24 px-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-center">
                <div className="max-w-3xl mx-auto">

                    <h2 className="text-3xl font-bold mb-8">
                        Ready to Make a Difference?
                    </h2>

                    <Link
                        to="/register"
                        className="bg-white text-green-700 px-8 py-3 rounded-lg font-medium shadow-lg hover:scale-105 transition"
                    >
                        Join Now
                    </Link>

                </div>
            </section>

        </div>
    );
}