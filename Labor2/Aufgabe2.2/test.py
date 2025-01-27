import codecs
import unicodedata
import csv

# Glyphen aus einer Datei einlesen
glyphs_file = "./glyphs.txt"
with open(glyphs_file, "r", encoding="utf-8") as file:
    glyphs = file.read().strip()

# Spaltennamen für die Tabelle
table_headers = ["Encoding", "Codepoint", "Encoded Codepoint", "Name of Character", "Glyph"]

# Funktion, um Informationen über ein Zeichen zu erhalten
def get_character_info(glyph):
    codepoint = f"U+{ord(glyph):04X}"
    name = unicodedata.name(glyph, "UNKNOWN")

    utf8_encoded = codecs.encode(glyph, "utf-8")
    utf16be_encoded = codecs.encode(glyph, "utf-16-be")
    utf32be_encoded = codecs.encode(glyph, "utf-32-be")

    return [
        ["UTF-8", codepoint, utf8_encoded.hex().upper(), name, glyph],
        ["UTF-16BE", codepoint, utf16be_encoded.hex().upper(), name, glyph],
        ["UTF-32BE", codepoint, utf32be_encoded.hex().upper(), name, glyph],
    ]

# Tabelle erstellen
results = []
for glyph in glyphs:
    results.extend(get_character_info(glyph))

# Ausgabe der Tabelle in der Konsole
header_line = f"{table_headers[0]:<10} | {table_headers[1]:<10} | {table_headers[2]:<20} | {table_headers[3]:<40} | {table_headers[4]:<15}"
print(header_line)
print("-" * len(header_line))
for row in results:
    print(f"{row[0]:<10} | {row[1]:<10} | {row[2]:<20} | {row[3]:<40} | {row[4]:<15}")

# Ergebnisse in eine CSV-Datei schreiben
output_file = "unicode_analysis.csv"
with open(output_file, "w", newline="", encoding="utf-8") as csvfile:
    writer = csv.writer(csvfile)
    writer.writerow(table_headers)
    writer.writerow([])  # Leere Zeile hinzufügen
    writer.writerows(results)

print(f"\nDie Ergebnisse wurden in die Datei '{output_file}' geschrieben.")
