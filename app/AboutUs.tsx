import React from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  Pressable,
  Animated,
  Linking,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Linkedin from "react-native-bootstrap-icons/icons/linkedin";
import Discord from "react-native-bootstrap-icons/icons/discord";
import Envelope from "react-native-bootstrap-icons/icons/envelope";
import Swal from "sweetalert2";
import styles from "../src/stylesheet/AboutUsStyles";

const teamMembers = [
  {
    name: "Lionel Derrick Roxas",
    role: "President and Web Developer",
    image: require("../assets/members/lionel.png"),
    linkedin: "https://www.linkedin.com/in/lionel-derrick-roxas-86b1612b5/",
    discord: "https://discord.gg/yHSsmVxtMm",
    email: "mailto:ldroxas@hawaii.edu",
  },
  {
    name: "Ralph John Ramos",
    role: "Vice President and Web Developer",
    image: require("../assets/members/ralph.png"),
    linkedin: "https://www.linkedin.com/in/ralph-jhon-ramos-8b7316242/",
    discord: "https://discord.gg/yHSsmVxtMm",
    email: "mailto:rramos26@hawaii.edu",
  },
  {
    name: "Jarell Ballesteros",
    image: require("../assets/members/jarell.png"),
    role: "Software Development Lead",
    linkedin: "https://www.linkedin.com/in/jarell-ballesteros-339990295/",
    discord: "https://discord.gg/yHSsmVxtMm",
    email: "mailto:ballesterosjarell@gmail.com",
  },
  {
    name: "Czarina Mae Viloria",
    role: "Treasurer and Digital Strategy Coordinator",
    image: require("../assets/members/czarina.png"),
    linkedin: "https://www.linkedin.com/in/czarina-viloria-8518412b5/",
    discord: "https://discord.gg/yHSsmVxtMm",
    email: "mailto:czarinav@gmail.com",
  },
  {
    name: "Nerissa MaeAnn Roxas",
    role: "Secretary and Content Creator",
    image: require("../assets/members/nerissa.png"),
    linkedin:
      "https://www.linkedin.com/in/nerissa-roxas-b07020327/overlay/contact-info/",
    discord: "https://discord.gg/yHSsmVxtMm",
    email: "mailto:nmroxas@hawaii.edu",
  },
  {
    name: "Geraldine Joy Javier",
    image: require("../assets/members/geraldine.png"),
    role: "Marketing Director and Brand Ambassador",
    linkedin: "https://linkedin.com/in/geraldine-joy-javier-a25886296",
    discord: "https://discord.gg/yHSsmVxtMm",
    email: "mailto:gjavier@hawaii.edu",
  },
  {
    name: "Ellie Ishii",
    image: require("../assets/members/ellie.png"),
    role: "Web Developer",
    linkedin: "https://linkedin.com/in/ellie-ishii-8a0043326",
    discord: "https://discord.gg/yHSsmVxtMm",
    email: "mailto:elliei@hawaii.edu",
  },
  {
    name: "MaryCris Marcos",
    image: require("../assets/members/marycris.png"),
    role: "Content Creator and Events Coordinator",
    linkedin: null,
    discord: "https://discord.gg/yHSsmVxtMm",
    email: "mailto:marcosmc@hawaii.edu",
  },
  // Add more team members as needed
];

export default function AboutUs() {
  const navigation = useNavigation();
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const translateY = React.useRef(new Animated.Value(20)).current;

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 2,
        duration: 500,
        useNativeDriver: false,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }),
    ]).start();
  }, [fadeAnim, translateY]);

  const handleLinkPress = async (url) => {
    if (!url) {
      // Handle case where URL is null or undefined
      Swal.fire(
        "Error",
        "Apologies! Haumana Exchange does not have access to this page.",
        "error"
      );
      return;
    }

    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Swal.fire("Error", "Link Not Supported", "error");
      }
    } catch (error) {
      Swal.fire("Error", "Something went wrong", "error");
    }
  };

  return (
    <Animated.View
      style={[
        styles.container,
        { opacity: fadeAnim, transform: [{ translateY }] },
      ]}
    >
      <Image
        source={require("../assets/UHS4.png")}
        style={styles.backgroundImage}
        resizeMode="cover"
      />
      <View style={styles.overlay}>
        <Pressable
          onPress={() => navigation.navigate("index")}
          style={styles.logoContainer}
        >
          <Image
          source={require("../assets/UHS2.png")}
          style={styles.logo}
          resizeMode="contain"
          />
        </Pressable>
        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.header}>About Us</Text>
          <Text style={styles.text}>
            <strong>
              Our mission is to empower the entrepreneurial spirit of students
              by providing a platform where their businesses and services can
              flourish.
            </strong>{" "}
            We aim to bridge the gap between academic learning and real-world
            experience, giving student entrepreneurs the tools, resources, and
            community support necessary to thrive in today's marketplace. By
            alleviating some of the challenges that come with entrepreneurship,
            we enable students to better focus on their academic pursuits while
            also creating meaningful opportunities for them to network with
            affiliated business professionals and leaders. Through this support,
            we aim to foster a balance between academic excellence and
            entrepreneurial growth, ensuring that our students not only excel in
            their studies but also gain invaluable industry connections and
            experience.
          </Text>
          <Text style={styles.text}>
            Haumāna Exchange is unique in that it is entirely
            student-maintained, showcasing the incredible talent of UH Manoa’s
            students. Our platform is developed and managed by our dedicated
            team of Information and Computer Sciences (ICS) students, who gain
            hands-on experience in web and business development. Through their
            work on Haumāna Exchange, these ICS students develop real-world
            technical skills, collaborate on large-scale projects, and build a
            portfolio that prepares them for future careers in the tech
            industry. Additionally, they gain insights into the business side of
            operations, learning how technology and entrepreneurship intersect
            to drive success.
          </Text>
          <Text style={styles.text}>
            Our marketing team plays an equally crucial role in our success,
            helping to promote student businesses, grow our platform's reach,
            and create a strong brand presence. Marketing team members gain
            practical experience in digital marketing, social media strategy,
            content creation, and brand management—skills that are highly sought
            after in today’s job market. By working closely with student
            entrepreneurs and external partners, they also build a network of
            connections that will benefit their future careers.
          </Text>
          <Text style={styles.text}>
            <strong>
              Our vision is to build a collaborative, innovative, and
              student-led organization that not only supports student
              entrepreneurs but also develops the next generation of business
              and tech leaders.
            </strong>{" "}
            By building this dynamic platform, we envision Haumāna Exchange
            becoming the #1 discovery platform for student entrepreneurs at UH
            Manoa, where students not only develop their ventures but also shape
            the future of student-led innovation. Through collaboration,
            mentorship, and shared success, we are driven by the belief that
            each of us has the power to leave a lasting impact—both on campus
            and beyond.
          </Text>
          <View style={styles.profileSection}>
            <Text style={styles.profileHeader}>Meet Our Haumāna Team</Text>
            <View style={styles.profileContainer}>
              {teamMembers.map((member, index) => (
                <View key={index} style={styles.profileCard}>
                  <Image source={member.image} style={styles.profileImage} />
                  <Text style={styles.profileName}>{member.name}</Text>
                  <Text style={styles.profileRole}>{member.role}</Text>
                  <View style={styles.socialContainer}>
                    <Pressable
                      onPress={() => handleLinkPress(member.linkedin)}
                    >
                      <Linkedin width={16} height={16} fill="green" />
                    </Pressable>
                    <Pressable
                      onPress={() => handleLinkPress(member.discord)}
                    >
                      <Discord width={16} height={16} fill="green" />
                    </Pressable>
                    <Pressable
                      onPress={() => handleLinkPress(member.email)}
                    >
                      <Envelope width={16} height={16} fill="green" />
                    </Pressable>
                  </View>
                </View>
              ))}
            </View>
          </View>
          {/* Admin Portal Link */}
          <View style={styles.adminLinkContainer}>
            <Pressable onPress={() => navigation.navigate("admin")}>
              <Text style={styles.adminLinkText}>Admin Portal</Text>
            </Pressable>
          </View>
        </ScrollView>
      </View>
    </Animated.View>
  );
}
