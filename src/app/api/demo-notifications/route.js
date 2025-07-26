import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET(request) {
    try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));

        // Demo notification data
        const demoNotifications = [
            {
                id: 1,
                title: "Congratulations!",
                message: "You have won a bag of rice with Ticket number **123459**. kindly go to '**auction wins**' on your profile to redeem your price.",
                ticket_number: "123459",
                date_created: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
                type: "auction_win",
                read: false,
                url: "/auction-wins"
            },
            {
                id: 2,
                title: "Your package will be delivered tomorrow",
                message: "You have won a bag of rice with Ticket number **123460**. kindly go to '**auction wins**' on your profile to redeem your price.",
                ticket_number: "123460",
                date_created: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), // 4 hours ago
                type: "delivery",
                read: false,
                url: "/my-order"
            },
            {
                id: 3,
                title: "Your order is on its way",
                message: "You have won a bag of rice with Ticket number **123461**. kindly go to '**auction wins**' on your profile to redeem your price.",
                ticket_number: "123461",
                date_created: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), // 6 hours ago
                type: "order_status",
                read: false,
                url: "/my-order"
            },
            {
                id: 4,
                title: "Congratulations!",
                message: "You have won a bag of rice with Ticket number **123462**. kindly go to '**auction wins**' on your profile to redeem your price.",
                ticket_number: "123462",
                date_created: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(), // 8 hours ago
                type: "auction_win",
                read: true,
                url: "/auction-wins"
            },
            {
                id: 5,
                title: "Congratulations!",
                message: "You have won a bag of rice with Ticket number **123463**. kindly go to '**auction wins**' on your profile to redeem your price.",
                ticket_number: "123463",
                date_created: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(), // 12 hours ago
                type: "auction_win",
                read: true,
                url: "/auction-wins"
            },
            {
                id: 6,
                title: "Payment Successful",
                message: "Your payment of ₦5,000 for auction tickets has been processed successfully. Your tickets are now active.",
                date_created: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
                type: "payment",
                read: false,
                url: "/wallet"
            },
            {
                id: 7,
                title: "New Auction Available",
                message: "A new auction for iPhone 15 Pro is now live! Don't miss out on this amazing opportunity.",
                date_created: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
                type: "auction_alert",
                read: false,
                url: "/auction"
            }
        ];

        const response = {
            status: "success",
            data: demoNotifications,
            count: demoNotifications.length
        };

        return NextResponse.json({ data: response, status: 200 });
    } catch (error) {
        console.error('Error processing request:', error.message);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
} 