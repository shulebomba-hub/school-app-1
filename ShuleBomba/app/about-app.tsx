import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { useTheme } from "@/context/ThemeContext";
import { Card, Divider } from "react-native-paper";
import {
  CheckCircle2,
  Shield,
  Users,
  Zap,
  ChevronLeft,
  BookOpen,
  BarChart3,
  Clock,
} from "lucide-react-native";

export default function AboutApp() {
  const router = useRouter();
  const { theme } = useTheme();

  const features = [
    {
      icon: Users,
      title: "Multi-Class Management",
      description: "Manage attendance for multiple classes in one place",
      color: "#3B82F6",
    },
    {
      icon: Clock,
      title: "Quick Attendance Taking",
      description: "Record attendance in seconds with an intuitive interface",
      color: "#10B981",
    },
    {
      icon: BarChart3,
      title: "View & Track Records",
      description: "Access saved attendance records anytime by date or class",
      color: "#F59E0B",
    },
    {
      icon: Zap,
      title: "100% Offline",
      description: "Works completely offline, no internet needed",
      color: "#8B5CF6",
    },
  ];

  const faqs = [
    {
      question: "What is Shule Bomba?",
      answer:
        "Shule Bomba is a modern, offline attendance management system designed for primary and secondary school teachers. It simplifies daily attendance taking and helps you keep organized student records without internet.",
    },
    {
      question: "Why should I use Shule Bomba?",
      answer:
        "• Save time on paperwork\n• Keep accurate digital records\n• Works completely offline\n• Easy to use interface\n• Secure and private\n• No complicated setup",
    },
    {
      question: "How do I get started?",
      answer:
        "1. Create your classes in the app\n2. Add students to each class\n3. Select a date and take attendance\n4. View and manage your records",
    },
    {
      question: "Is my data private and secure?",
      answer:
        "Yes! All your attendance data is stored securely on your device. We never share your information with anyone or store it on external servers.",
    },
    {
      question: "Can I use it offline?",
      answer:
        "Absolutely! Shule Bomba is designed to work 100% offline. You don't need internet connection to take attendance or view your records.",
    },
  ];

  const reasons = [
    { title: "Simple & Intuitive", desc: "No training needed, easy for anyone to use" },
    { title: "Fast & Reliable", desc: "Quick attendance taking in seconds" },
    { title: "Offline First", desc: "Works anywhere, anytime, with no internet" },
    { title: "Teacher-Focused", desc: "Built specifically for classroom needs" },
    { title: "Secure Privacy", desc: "Your data stays on your device" },
    { title: "Free to Use", desc: "No hidden costs or subscriptions" },
  ];

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
      style={{ backgroundColor: theme.background }}
    >
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <ChevronLeft size={24} color={theme.text} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: theme.text }]}>About Shule Bomba</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* Hero Section */}
        <Card style={[styles.heroCard, { backgroundColor: "#3B82F6" }]}>
          <View style={styles.heroContent}>
            <BookOpen size={48} color="#fff" />
            <Text style={styles.heroTitle}>Shule Bomba</Text>
            <Text style={styles.heroSubtitle}>
              Modern Attendance Management for Teachers
            </Text>
            <Text style={styles.versionText}>Version 1.0.0</Text>
          </View>
        </Card>

        {/* Mission Section */}
        <Card style={[styles.section, { backgroundColor: theme.card }]}>
          <View style={styles.sectionContent}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>Our Mission</Text>
            <Text style={[styles.sectionText, { color: theme.text }]}>
              To empower teachers with a simple, reliable tool that eliminates paperwork,
              saves time, and helps manage student attendance with confidence and ease.
            </Text>
          </View>
        </Card>

        {/* Key Features */}
        <View style={styles.featuresSection}>
          <Text style={[styles.sectionTitle, { color: theme.text, paddingHorizontal: 16 }]}>
            Key Features
          </Text>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View style={styles.featureGrid}>
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card
                  key={index}
                  style={[styles.featureCard, { backgroundColor: theme.card }]}
                >
                  <View
                    style={[styles.featureIconBox, { backgroundColor: feature.color + "20" }]}
                  >
                    <IconComponent size={28} color={feature.color} />
                  </View>
                  <Text style={[styles.featureTitle, { color: theme.text }]}>
                    {feature.title}
                  </Text>
                  <Text style={[styles.featureDesc, { color: theme.text }]}>
                    {feature.description}
                  </Text>
                </Card>
              );
            })}
          </View>
          </ScrollView>
        </View>

        {/* Why Choose Us */}
        <Card style={[styles.section, { backgroundColor: theme.card }]}>
          <View style={styles.sectionContent}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>Why Choose ShuleBomba?</Text>
            <View style={styles.reasonsList}>
              {reasons.map((reason, index) => (
                <View key={index} style={styles.reasonItem}>
                  <CheckCircle2 size={20} color="#10B981" />
                  <View style={styles.reasonText}>
                    <Text style={[styles.reasonTitle, { color: theme.text }]}>
                      {reason.title}
                    </Text>
                    <Text style={[styles.reasonDesc, { color: theme.text }]}>
                      {reason.desc}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </Card>

        {/* FAQs */}
        <View style={styles.faqSection}>
          <Text style={[styles.sectionTitle, { color: theme.text, paddingHorizontal: 16 }]}>
            Frequently Asked Questions
          </Text>
          {faqs.map((faq, index) => (
            <Card key={index} style={[styles.faqCard, { backgroundColor: theme.card }]}>
              <View style={styles.faqContent}>
                <Text style={[styles.faqQuestion, { color: theme.text }]}>
                  {faq.question}
                </Text>
                <Text style={[styles.faqAnswer, { color: theme.text }]}>
                  {faq.answer}
                </Text>
              </View>
            </Card>
          ))}
        </View>

        {/* Security & Privacy */}
        <Card style={[styles.section, { backgroundColor: theme.card }]}>
          <View style={styles.sectionContent}>
            <View style={styles.securityHeader}>
              <Shield size={28} color="#10B981" />
              <Text style={[styles.sectionTitle, { color: theme.text, marginLeft: 12 }]}>
                Security & Privacy
              </Text>
            </View>
            <Text style={[styles.sectionText, { color: theme.text, marginTop: 12 }]}>
              Your attendance data is stored securely on your device. We never share your
              information with third parties or store it on external servers. Your privacy
              is our priority.
            </Text>
          </View>
        </Card>

        {/* Footer */}
        <View style={[styles.footer, { backgroundColor: theme.card }]}>
          <Text style={[styles.footerText, { color: theme.text }]}>
            Made with ❤️ for Teachers
          </Text>
          <Text style={[styles.footerSubtext, { color: theme.text }]}>
            © 2026 ShuleBomba. All rights reserved.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 32,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
  },
  heroCard: {
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 20,
    borderRadius: 16,
    padding: 24,
  },
  heroContent: {
    alignItems: "center",
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#fff",
    marginTop: 12,
  },
  heroSubtitle: {
    fontSize: 14,
    color: "rgba(255,255,255,0.9)",
    marginTop: 8,
    textAlign: "center",
  },
  versionText: {
    fontSize: 12,
    color: "rgba(255,255,255,0.7)",
    marginTop: 12,
  },
  section: {
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
    overflow: "hidden",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  sectionContent: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
  },
  sectionText: {
    fontSize: 14,
    lineHeight: 22,
    color: "#6B7280",
  },
  featuresSection: {
    marginBottom: 16,
  },
  featureGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 8,
    gap: 8,
  },
  featureCard: {
    width: "auto",
    borderRadius: 12,
    padding: 14,
    marginHorizontal: 8,
    marginBottom: 8,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    
  },
  featureIconBox: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  featureTitle: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 6,
  },
  featureDesc: {
    fontSize: 12,
    color: "#6B7280",
    lineHeight: 16,
  },
  reasonsList: {
    marginTop: 8,
  },
  reasonItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 14,
  },
  reasonText: {
    flex: 1,
    marginLeft: 12,
  },
  reasonTitle: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 2,
  },
  reasonDesc: {
    fontSize: 12,
    color: "#6B7280",
    lineHeight: 16,
  },
  faqSection: {
    marginBottom: 16,
  },
  faqCard: {
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 12,
    overflow: "hidden",
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  faqContent: {
    padding: 16,
  },
  faqQuestion: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 10,
  },
  faqAnswer: {
    fontSize: 13,
    color: "#6B7280",
    lineHeight: 20,
  },
  securityHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  footer: {
    marginHorizontal: 16,
    marginTop: 20,
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
  },
  footerText: {
    fontSize: 14,
    fontWeight: "600",
  },
  footerSubtext: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 4,
  },
});

