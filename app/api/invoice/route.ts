import { NextRequest } from "next/server";
import { connectToDatabase } from "@/lib/db";
import Order from "@/models/Order";
import { renderToBuffer } from "@react-pdf/renderer";
import {
  Document,
  Page,
  Text,
  StyleSheet,
  View,
  Image,
} from "@react-pdf/renderer";
import React from "react";

type OrderType = {
  _id: string;
  userId: string;
  productId: string;
  variant: {
    price: number;
    type: string;
    license: string;
  };
  quantity: number;
  amount: number;
  shippingAddress: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
  };
};

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 10,
    fontFamily: "Helvetica",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    alignItems: "center",
  },
  logo: {
    width: 120,
    height: 40,
  },
  invoiceTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#008000",
  },
  companyName: {
    fontSize: 12,
    fontWeight: "bold",
  },
  companyAddress: {
    fontSize: 10,
  },
  invoiceInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  invoiceInfoLeft: {
    width: "50%",
  },
  invoiceInfoRight: {
    width: "50%",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  infoLabel: {
    fontWeight: "bold",
    width: "40%",
  },
  infoValue: {
    width: "60%",
  },
  total: {
    marginTop: 30,
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "right",
  },
});

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const orderId = searchParams.get("orderId");

  if (!orderId) return new Response("Missing orderId", { status: 400 });

  await connectToDatabase();
  const order = await Order.findById(orderId).lean() as OrderType | null;

  if (!order) return new Response("Order not found", { status: 404 });

  try {
    const invoiceNo = "INV-" + order._id.toString().slice(-6).toUpperCase();
    const orderNo = "ORD-" + order._id.toString().slice(-8).toUpperCase();

    const today = new Date().toLocaleDateString("en-GB");

    const totalPrice = order.amount;

    const elements = [
      React.createElement(View, { key: "header", style: styles.header }, [
        React.createElement(Image, {
          key: "logo",
          style: styles.logo,
          src: "https://raw.githubusercontent.com/amruthexe/Talent-trek/main/public/image.png",
        }),
        React.createElement(Text, { key: "title", style: styles.invoiceTitle }, "TAX INVOICE"),
        React.createElement(View, { key: "company", style: { alignItems: "flex-end" } }, [
          React.createElement(Text, { key: "companyName", style: styles.companyName }, "VEVVION WELLNESS PRIVATE LIMITED,"),
          React.createElement(Text, { key: "line1", style: styles.companyAddress }, "InstaOffice, 1st Floor, SPD Plaza, Opp. Jyothi Nivas"),
          React.createElement(Text, { key: "line2", style: styles.companyAddress }, "College, Koramangala Industrial Layout, Bangalore."),
          React.createElement(Text, { key: "line3", style: styles.companyAddress }, "Karnataka. 560034"),
        ]),
      ]),
      React.createElement(View, { key: "info-block", style: styles.invoiceInfoContainer }, [
        React.createElement(View, { key: "left", style: styles.invoiceInfoLeft }, [
          React.createElement(Text, { key: "consignee-label", style: { fontWeight: "bold", marginBottom: 5 } }, "CONSIGNEE:"),
          React.createElement(Text, { key: "consignee-phone", style: { marginBottom: 5 } }, "Mobile: " + order.shippingAddress.phone),
          React.createElement(Text, { key: "buyer-label", style: { fontWeight: "bold", marginTop: 10, marginBottom: 5 } }, "BUYER (If other than the Consignee):"),
          React.createElement(Text, { key: "buyer-phone", style: { marginBottom: 5 } }, "Mobile:"),
        ]),
        React.createElement(View, { key: "right", style: styles.invoiceInfoRight }, [
          React.createElement(View, { key: "gst", style: styles.infoRow }, [
            React.createElement(Text, { style: styles.infoLabel }, "GSTIN"),
            React.createElement(Text, { style: styles.infoValue }, ": 29AAICV6290Q1Z8"),
          ]),
          React.createElement(View, { key: "cin", style: styles.infoRow }, [
            React.createElement(Text, { style: styles.infoLabel }, "CIN"),
            React.createElement(Text, { style: styles.infoValue }, ": U52399KA2022PTC159290"),
          ]),
          React.createElement(View, { key: "pan", style: styles.infoRow }, [
            React.createElement(Text, { style: styles.infoLabel }, "PAN"),
            React.createElement(Text, { style: styles.infoValue }, ": AAICV6290Q"),
          ]),
          React.createElement(Text, { key: "payment-mode", style: { fontWeight: "bold", marginTop: 10, marginBottom: 5 } }, "PAYMENT MODE: Razorpay"),
          React.createElement(Text, { key: "payment-ref", style: { marginBottom: 5 } }, "PAYMENT REF NO:"),
          React.createElement(View, { key: "invoice-no", style: styles.infoRow }, [
            React.createElement(Text, { style: styles.infoLabel }, "INVOICE NO"),
            React.createElement(Text, { style: styles.infoValue }, ": " + invoiceNo),
          ]),
          React.createElement(View, { key: "invoice-date", style: styles.infoRow }, [
            React.createElement(Text, { style: styles.infoLabel }, "INVOICE DATE"),
            React.createElement(Text, { style: styles.infoValue }, ": " + today),
          ]),
          React.createElement(View, { key: "order-no", style: styles.infoRow }, [
            React.createElement(Text, { style: styles.infoLabel }, "ORDER NO"),
            React.createElement(Text, { style: styles.infoValue }, ": " + orderNo),
          ]),
          React.createElement(View, { key: "order-date", style: styles.infoRow }, [
            React.createElement(Text, { style: styles.infoLabel }, "ORDER DATE"),
            React.createElement(Text, { style: styles.infoValue }, ": " + today),
          ]),
        ]),
      ]),
      React.createElement(View, { key: "total", style: styles.total }, [
        React.createElement(Text, { key: "total-price" }, "Total Price: INR " + totalPrice.toFixed(2)),
      ]),
    ];

    const document = React.createElement(
      Document,
      null,
      React.createElement(Page, { size: "A4", style: styles.page }, elements)
    );

    const pdfBuffer = await renderToBuffer(document);

    return new Response(pdfBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename=invoice-${order._id}.pdf`,
        "Content-Length": pdfBuffer.length.toString(),
      },
    });
  } catch (error) {
    console.error("PDF generation error:", error);
    return new Response("Failed to generate invoice PDF", { status: 500 });
  }
}
