# Difflib uses LCS(Longest Common Subsequence Algorithm) to find the similarity between two strings.
# The failure of Difflib can be observed here 
import difflib

string1 = "I love to eat apple."
string2 = "I do not like to eat pineapple."

temp = difflib.SequenceMatcher(None,string1 ,string2)

print('Similarity Score: ',temp.ratio())