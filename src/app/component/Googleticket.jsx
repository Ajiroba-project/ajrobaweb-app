import React from 'react';

export default function GoogleTicket() {
    return (
        <div className="w-full max-w-5xl mx-auto p-4">
            <div className="flex flex-col lg:flex-row bg-gradient-to-r from-red-500 to-orange-500 rounded-lg overflow-hidden shadow-xl">

                {/* Main Left Section */}
                <div className="flex-1 relative overflow-hidden" style={{
                    background: 'linear-gradient(135deg, #ef4444 0%, #f97316 100%)',
                    minHeight: '400px'
                }}>
                    {/* Decorative Background Elements */}
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="absolute -top-16 -left-16 w-48 h-48 bg-white opacity-5 rounded-full"></div>
                        <div className="absolute top-1/2 -right-20 w-64 h-64 bg-white opacity-5 rounded-full"></div>
                        <div className="absolute -bottom-12 left-1/3 w-32 h-32 bg-white opacity-5 rounded-full"></div>
                        <div className="absolute top-20 left-1/2 w-24 h-24 bg-white opacity-3 rounded-full"></div>
                    </div>

                    <div className="relative z-10 p-8 lg:p-12 h-full text-white">
                        {/* Header */}
                        <div className="flex justify-between items-start mb-8">
                            <div className="bg-white text-red-600 px-4 py-2 rounded-md font-bold text-sm">
                                🏪 AJIROBA
                            </div>
                            <div className="text-right">
                                <div className="text-xs opacity-80 mb-1">TICKET NO:</div>
                                <div className="font-bold text-lg">1414199</div>
                            </div>
                        </div>

                        {/* Main Title */}
                        <div className="mb-12">
                            <h1 className="text-5xl lg:text-6xl font-light leading-tight mb-2">
                                Raffle Draw
                            </h1>
                            <h2 className="text-7xl lg:text-8xl font-bold leading-none mb-3">
                                Ticket
                            </h2>
                            <div className="w-16 h-1 bg-white"></div>
                        </div>

                        {/* Ticket Details with Dashed Lines */}
                        <div className="space-y-4 mb-8">
                            <div className="flex items-center justify-between border-b border-dashed border-white border-opacity-30 pb-2">
                                <span className="text-white">Ticket Price:</span>
                                <div className="bg-white text-black px-4 py-1 rounded font-bold">
                                    N 200
                                </div>
                            </div>

                            <div className="flex items-center justify-between border-b border-dashed border-white border-opacity-30 pb-2">
                                <span className="text-white">Purchase Date:</span>
                                <div className="bg-white text-black px-4 py-1 rounded font-bold">
                                    May 23, 2025
                                </div>
                            </div>

                            <div className="flex items-center justify-between border-b border-dashed border-white border-opacity-30 pb-2">
                                <span className="text-white">Product:</span>
                                <div className="bg-white text-black px-4 py-1 rounded font-bold">
                                    T - Shirt
                                </div>
                            </div>

                            <div className="flex items-center justify-between border-b border-dashed border-white border-opacity-30 pb-2">
                                <span className="text-white">Raffle Date:</span>
                                <div className="bg-white text-black px-4 py-1 rounded font-bold">
                                    May 23, 2025
                                </div>
                            </div>

                            <div className="flex items-center justify-between border-b border-dashed border-white border-opacity-30 pb-2">
                                <span className="text-white">RaffleTime:</span>
                                <div className="bg-white text-black px-4 py-1 rounded font-bold">
                                    7:30 PM
                                </div>
                            </div>
                        </div>

                        {/* Footer Text */}
                        <div className="text-sm italic opacity-90">
                            ...The more ticket you buy, the more your chances of winning
                        </div>
                    </div>
                </div>

                {/* Perforated Divider */}
                <div className="hidden lg:flex flex-col items-center justify-center bg-white px-2 py-4" style={{ width: '20px' }}>
                    {Array.from({ length: 15 }).map((_, i) => (
                        <div key={i} className="w-3 h-3 bg-gray-400 rounded-full mb-2 last:mb-0"></div>
                    ))}
                </div>

                {/* Mobile Perforated Divider */}
                <div className="lg:hidden flex items-center justify-center bg-white py-2 px-4">
                    {Array.from({ length: 20 }).map((_, i) => (
                        <div key={i} className="w-3 h-3 bg-gray-400 rounded-full mr-2 last:mr-0"></div>
                    ))}
                </div>

                {/* Right Stub Section */}
                <div className="w-full lg:w-80 relative overflow-hidden" style={{
                    background: 'linear-gradient(135deg, #ef4444 0%, #f97316 100%)',
                    minHeight: '400px'
                }}>
                    {/* Decorative Background Elements */}
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="absolute -top-8 -right-8 w-24 h-24 bg-white opacity-5 rounded-full"></div>
                        <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-white opacity-5 rounded-full"></div>
                        <div className="absolute top-1/3 left-1/2 w-16 h-16 bg-white opacity-3 rounded-full"></div>
                    </div>

                    <div className="relative z-10 p-6 lg:p-8 h-full text-white">
                        {/* Header */}
                        <div className="flex justify-between items-start mb-6">
                            <div className="bg-white text-red-600 px-3 py-1 rounded font-bold text-xs">
                                🏪 AJIROBA
                            </div>
                            <div className="text-right">
                                <div className="text-xs opacity-80 mb-1">TICKET NO:</div>
                                <div className="font-bold text-sm">1414199</div>
                            </div>
                        </div>

                        {/* Title */}
                        <div className="mb-8">
                            <h3 className="text-xl font-light mb-1">Raffle Draw</h3>
                            <h4 className="text-3xl font-bold mb-2">Ticket</h4>
                            <div className="w-12 h-0.5 bg-white"></div>
                        </div>

                        {/* Compact Details */}
                        <div className="space-y-3 mb-6 text-sm">
                            <div className="flex justify-between items-center">
                                <span className="text-white opacity-90">Ticket Price:</span>
                                <div className="bg-white text-black px-3 py-1 rounded font-bold text-xs">
                                    N 200
                                </div>
                            </div>

                            <div className="flex justify-between items-center">
                                <span className="text-white opacity-90">Purchase Date:</span>
                                <div className="bg-white text-black px-3 py-1 rounded font-bold text-xs">
                                    May 23, 2025
                                </div>
                            </div>

                            <div className="flex justify-between items-center">
                                <span className="text-white opacity-90">Product:</span>
                                <div className="bg-white text-black px-3 py-1 rounded font-bold text-xs">
                                    T - Shirt
                                </div>
                            </div>

                            <div className="flex justify-between items-center">
                                <span className="text-white opacity-90">Raffle Date:</span>
                                <div className="bg-white text-black px-3 py-1 rounded font-bold text-xs">
                                    May 23, 2025
                                </div>
                            </div>

                            <div className="flex justify-between items-center">
                                <span className="text-white opacity-90">Raffle Time:</span>
                                <div className="bg-white text-black px-3 py-1 rounded font-bold text-xs">
                                    7:30 PM
                                </div>
                            </div>
                        </div>

                        {/* Footer Text */}
                        <div className="text-xs italic opacity-90">
                            ...The more ticket you buy, the more your chances of winning
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}