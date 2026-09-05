import { useRef } from "react";
import {
    Animated,
    Dimensions,
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
} from "react-native";
const { width: SCREEN_WIDTH } = Dimensions.get("window");
const CARD_WIDTH = SCREEN_WIDTH * 0.68;
const CARD_SPACING = 10;

const IMAGES = {
  colombia: require("../../assets/colombia.png"),
  brazil: require("../../assets/brazil.png"),
  guatemala: require("../../assets/guatemala.png"),
  ethiopia: require("../../assets/ethiopia.png"),
  kenya: require("../../assets/kenya.png"),
} as const;

type CountryKey = keyof typeof IMAGES;

type Module = {
  id: CountryKey;
  title: string;
  description: string;
};

const MODULES: Module[] = [
  {
    id: "colombia",
    title: "Colombia",
    description:
      "Grown on volcanic slopes in the Andes at 1,200-2,000m. Washed process, medium roast. Notes of red apple, caramel and a clean, mild acidity.",
  },

  {
    id: "brazil",
    title: "Brazil Santos",
    description:
      "Sourced from the Cerrado plateau's low-altitude farms. Natural (dry) processed, giving it a heavy body, low acidity and notes of roasted nuts and dark chocolate.",
  },
  {
    id: "guatemala",
    title: "Guatemala",
    description:
      "Antigua Valley beans grown in mineral-rich volcanic soil at 1,500m+. Full-bodied with notes of cocoa, smoke and a subtle spice on the finish.",
  },
  {
    id: "ethiopia",
    title: "Ethiopia",
    description:
      "Considered the birthplace of coffee, from the Yirgacheffe and Sidamo highlands. Heirloom varietals, light roast. Floral, citrusy, and often compared to fine wine.",
  },
  {
    id: "kenya",
    title: "Kenya",
    description:
      "High-altitude beans (1,700m+) from the slopes near Mount Kenya. Double-fermented washed process yields a bright, wine-like acidity with blackcurrant and berry notes.",
  },
];

export default function Index() {
  const scrollX = useRef(new Animated.Value(0)).current;
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Welcome to your local brewery.</Text>
      <Text style={styles.secondaryheader}>
        Choose your favourite coffee bean and brew it already!{" "}
      </Text>

      <Animated.FlatList
        data={MODULES}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={CARD_WIDTH + CARD_SPACING}
        contentContainerStyle={styles.list}
        decelerationRate="fast"
        ItemSeparatorComponent={() => (
          <View style={{ width: CARD_SPACING }}></View>
        )}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true },
        )}
        scrollEventThrottle={16}
        renderItem={({ item, index }) => {
          const inputRange = [
            (index - 1) * (CARD_WIDTH + CARD_SPACING),
            index * (CARD_WIDTH + CARD_SPACING),
            (index + 1) * (CARD_WIDTH + CARD_SPACING),
          ];

          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.92, 1, 0.92],
            extrapolate: "clamp",
          });

          return (
            <Animated.View
              style={[
                styles.card,
                { width: CARD_WIDTH, transform: [{ scale }] },
              ]}
            >
              <Image
                source={IMAGES[item.id]}
                style={styles.cardImage}
                resizeMode="contain"
              />
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardDescription}>{item.description}</Text>
            </Animated.View>
          );
        }}
      />
      <Text style={styles.footer}>Freshly roasted, just for you </Text>
      <Text style={styles.smallfooter}>contact us @mylocalbrewery</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#422D28",
    flex: 1,
    alignItems: "center",
    paddingTop: 24,
  },
  header: {
    color: "#F0E7D5",
    fontSize: 50,
    fontStyle: "italic",
    fontFamily: "Helvetica",
    textAlign: "center",
    paddingHorizontal: 16,
    marginTop: 40,
  },
  secondaryheader: {
    color: "#F0E7D5",
    textAlign: "center",
    fontFamily: "Helvetica",
    fontSize: 13,
    paddingHorizontal: 24,
    marginTop: 15,
    marginBottom: -10,
  },
  listContent: {
    paddingHorizontal: (SCREEN_WIDTH - CARD_WIDTH) / 2,
  },
  card: {
    backgroundColor: "#B6CFE4",
    borderRadius: 20,
    padding: 18,
    aspectRatio: 0.7,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },
  cardImage: {
    width: 120,
    height: 120,
    marginBottom: 10,
  },
  cardTitle: {
    color: "#422D28",
    fontSize: 20,
    fontFamily: "Helvetica",
    fontWeight: "600",
    marginTop: 20,
    marginBottom: 8,
  },
  cardDescription: {
    color: "#422D28",
    fontFamily: "Helvetica",
    fontStyle: "italic",
    fontSize: 14,
    lineHeight: 20,
  },
  list: {
    marginTop: 70,
    flexGrow: 0,
  },
  footer: {
    color: "#F0E7D5",
    fontSize: 13,
    textAlign: "center",
    marginTop: "auto",
    paddingBottom: 24,
    opacity: 0.7,
  },
  smallfooter: {
    color: "#F0E7D5",
    fontSize: 10,
    textAlign: "center",
    marginTop: -12,
    paddingBottom: 24,
    opacity: 0.7,
  },
});
