import statistics
from difflib import SequenceMatcher
from googleapiclient.discovery import build
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from nltk.tokenize import sent_tokenize
from nltk.tokenize import word_tokenize
from nltk.corpus import wordnet
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
import string
import ahpy
# from ahp import pairwise
import nltk
import yake
import pyanp
import numpy as np
from difflib import SequenceMatcher
nltk.download('punkt')
nltk.download('stopwords')
nltk.download('wordnet')
nltk.download('omw-1.4')
nltk.download('averaged_perceptron_tagger')

# # my_api_key = "AIzaSyDaS_yp6jSkBET9Z5ozTpjfFtb6C2pvYB8"
# my_cse_id = "037c2615c9b2e4e0f"
# my_api_key = "AIzaSyCHee8_tp0jA6i4Ui7IrLR6SE_6RxqD0Wo" working
my_cse_id = "6158cb9ed9567478b"
# # my_api_key = "AIzaSyBFz93EhgN2_lOXTSEec26Cc-uja0Tr-9g" working
# # my_cse_id = "6158cb9ed9567478b"
# my_api_key = "AIzaSyBzLQiTsvKVY_HlF7qDn0o7OO-_HD-iyDc"


# LEVEL 0 PLAG CHECK 
def google_search_result(sus,type,apikey):
    my_api_key = apikey
    if type == 1:
        # join values of sus dictionary to str
        sus = sus['data']
    else: 
        sus_title = sus['sus_title']
        sus_ps_obj = sus['sus_ps_obj']
        sus_keywords = sus['sus_keywords']
        sus_introduction = sus['sus_introduction']
        sus_proposed_method = sus['sus_proposed_method']
        sus = sus_title + ' ' + sus_ps_obj + ' ' + sus_keywords + ' ' + sus_introduction + ' ' + sus_proposed_method 

    def google_search(searching_for, api_key, cse_id, **kwargs):
        service = build("customsearch", "v1", developerKey=api_key)
        res = service.cse().list(q=searching_for, cx=cse_id, **kwargs).execute()
        return res

    def snippet_confidence(web_snippet, orig_chunk):
        web_snippet = web_snippet.replace('\n', '')
        orig_chunk = orig_chunk.replace('\n', '')
        match = SequenceMatcher(None, web_snippet, orig_chunk).find_longest_match(
            0, len(web_snippet), 0, len(orig_chunk))
        match = web_snippet[match.a: match.a + match.size]
        diff = round(len(match) / len(web_snippet), 2)
        return diff

    def calculate_score(confidence):
        mean = round(statistics.mean(list(confidence.values())), 2)
        # sort confidence based on value
        confidence = dict(sorted(confidence.items(), key=lambda x: x[1], reverse=True))
        print('Average Score: ', mean)
        # check if any value in confidence is greater than 0.9
        # if any(x > 0.9 for x in confidence.values()):
        #     confidence=dict(list(confidence.items())[:10])
        #     return 1, dict(list(confidence.items())[:10])
        # elif mean >= 0.50:
        #     return mean, dict(list(confidence.items())[:10])
        # else:
        #     return mean, dict(list(confidence.items())[:10])
        counter = 0
        for value in confidence.values():
            if value > 0.8:
                counter+=1
        print(len(confidence))
        if counter/len(confidence) > 0.3:
            return 1, dict(list(confidence.items())[:10])
        else:
            return mean, dict(list(confidence.items())[:10])


    data = sus.split()
    chunks = list()
    end=20
    start = 0
    while end < len(data):
        chunk = ' '.join(data[start:end])
        chunks.append(chunk)
        end = end + 20
        start = start + 2
        if end > len(data):
            end = len(data)
            chunk = data[start:end]
            chunks.append(chunk)
    confidence = {}
    itr = 1
    for chunk in chunks:
        print("chunk: ",chunk)
        if itr > 3:
            break
        response = google_search(str(chunk), my_api_key, my_cse_id)
        num_results = response.get('searchInformation').get('totalResults')
        if num_results != '0':
            for item in response.get('items'):
                print('item: ',item)
                web_snippet = ''.join(item['snippet'][0:203])
                print("web_snippet: ",web_snippet)
                confidence[item['link']] = snippet_confidence(web_snippet, chunk)
                # confidence.append(snippet_confidence(web_snippet, str(chunk)))
        itr = itr + 1
        print("confidence: ",confidence)
    return calculate_score(confidence)

# LEVEL 1 PLAG CHECK
def level1_check(sus, og):
    sus_bibliography = sus['sus_bibliography']
    sus_literature_review = sus['sus_literature_review']
    sus_keywords = sus['sus_keywords']
    og_bibliography = og['og_bibliography']
    og_literature_review = og['og_literature_review']
    og_keywords = og['og_keywords']

    similarity_ratio1 = SequenceMatcher(
        None, sus_bibliography, og_bibliography).ratio()
    similarity_ratio2 = SequenceMatcher(
        None, sus_literature_review, og_literature_review).ratio()
    similarity_ratio3 = SequenceMatcher(
        None, sus_keywords, og_keywords).ratio()
    
    similarity_ratio = similarity_ratio1 * 0.4 + similarity_ratio2 * 0.5 + similarity_ratio3 * 0.1
    print(similarity_ratio1,similarity_ratio2,similarity_ratio3)
    return {"level1_check": similarity_ratio}

# perform preprocessing on input data to get cleaned data
def preprocess(input_file):
    # perform segmentation
    sentences = sent_tokenize(input_file)
    # perform tokenization
    tokenized_sentences = [word_tokenize(sentence) for sentence in sentences]
    # perform stopword removal
    stop_words = set(stopwords.words('english'))
    filtered_sentences = [[word for word in sentence if word not in stop_words]
                          for sentence in tokenized_sentences]
    # perform punctuation removal
    punctuations = string.punctuation
    filtered_sentences = [[word for word in sentence if word not in punctuations]
                          for sentence in filtered_sentences]
    # perform lowercasing
    filtered_sentences = [[word.lower() for word in sentence]
                          for sentence in filtered_sentences]
    # perform lemmatization and stemming
    lemmatizer = WordNetLemmatizer()
    stemmed_sentences = [[lemmatizer.lemmatize(
        word) for word in sentence] for sentence in filtered_sentences]
    # perform pos tagging
    pos_tagged_sentences = [nltk.pos_tag(sentence)
                            for sentence in stemmed_sentences]
    # perform bag of words
    bag_of_words = [[word for word, pos in sentence]
                    for sentence in pos_tagged_sentences]
    # convert bag_of_words to a list of words
    bag_of_words = [word for sentence in bag_of_words for word in sentence]
    # perform bigram and trigram generation
    bigrams = nltk.bigrams(bag_of_words)
    trigrams = nltk.trigrams(bag_of_words)

    # perform term frequency calculation
    term_frequency = {}
    for word in bag_of_words:
        if word in term_frequency:
            term_frequency[word] += 1
        else:
            term_frequency[word] = 1

    # perform term frequency calculation for bigrams
    bigram_frequency = {}
    for bigram in bigrams:
        if bigram in bigram_frequency:
            bigram_frequency[bigram] += 1
        else:
            bigram_frequency[bigram] = 1

    # perform term frequency calculation for trigrams
    trigram_frequency = {}
    for trigram in trigrams:
        if trigram in trigram_frequency:
            trigram_frequency[trigram] += 1
        else:
            trigram_frequency[trigram] = 1

    # perform term frequency sorting
    sorted_term_frequency = sorted(
        term_frequency.items(), key=lambda x: x[1], reverse=True)
    sorted_bigram_frequency = sorted(
        bigram_frequency.items(), key=lambda x: x[1], reverse=True)
    sorted_trigram_frequency = sorted(
        trigram_frequency.items(), key=lambda x: x[1], reverse=True)

    # extract words with frequency greater than 10
    frequent_words = [word for word,
                      frequency in sorted_term_frequency if frequency > 0]
    frequent_bigrams = [bigram for bigram,
                        frequency in sorted_bigram_frequency if frequency > 0]
    frequent_trigrams = [trigram for trigram,
                         frequency in sorted_trigram_frequency if frequency > 0]

    # generate synonyms for frequent words using wordnet and add them to frequent_words list
    syn_words = []
    for word in frequent_words:
        for syn in wordnet.synsets(word):
            for l in syn.lemmas():
                syn_words.append(l.name())
    frequent_words = frequent_words + syn_words
    frequent_words = list(set(frequent_words))

    return frequent_words, frequent_bigrams, frequent_trigrams


def taking_input(user_file, db_file):
    sus_term, sus_bigram, sus_trigram = preprocess(user_file)
    db_term, db_bigram, db_trigram = preprocess(db_file)

    # return intersection of sus and db
    return len(list(set(sus_term).intersection(db_term))), len(list(set(sus_bigram).intersection(db_bigram))), len(list(set(sus_trigram).intersection(db_trigram)))


def printing_similarity(og, sus, type):
    if type == 1:
        # join values of sus dictionary to str
        sus = sus['data']
        # sus = ' '.join(sus.values())
        sus_words = sus.split()
        suslen = len(sus_words)

        sus_title = ' '.join(sus_words[0:20])
        fifteenpercent = int(suslen*15/100)
        sus_ps_obj = ' '.join(sus_words[20:fifteenpercent])


        kw_extractor = yake.KeywordExtractor(top=10, stopwords=None)
        keywords = kw_extractor.extract_keywords(sus)
        keywords = ", ".join(list(dict(keywords).keys()))
        sus_keywords = keywords
        sus_introduction = ' '.join(sus_words[fifteenpercent+1:fifteenpercent + fifteenpercent])
        twentyfivepercent = int(suslen*25/100)
        sus_literature_review = ' '.join(sus_words[fifteenpercent+fifteenpercent+1:fifteenpercent+fifteenpercent+twentyfivepercent])
        thirtyfivepercent = int(suslen*35/100)
        sus_proposed_method = ' '.join(sus_words[fifteenpercent+fifteenpercent+twentyfivepercent+1:fifteenpercent+fifteenpercent+twentyfivepercent+thirtyfivepercent])
    else: 
        sus_title = sus['sus_title']
        sus_ps_obj = sus['sus_ps_obj']
        sus_keywords = sus['sus_keywords']
        sus_introduction = sus['sus_introduction']
        sus_proposed_method = sus['sus_proposed_method']
        # sus_evaluation_result = sus['sus_evaluation_result']
        # sus_conclusion = sus['sus_conclusion']


    og_title = og['og_title']
    og_ps_obj = og['og_ps_obj']
    og_keywords = og['og_keywords']
    og_introduction = og['og_introduction']
    og_proposed_method = og['og_proposed_method']
    # og_evaluation_result = og['og_evaluation_result']
    # og_conclusion = og['og_conclusion']


    og = [og_title, og_ps_obj, og_keywords, og_introduction,
          og_proposed_method]
    sus = [sus_title, sus_ps_obj, sus_keywords, sus_introduction,
           sus_proposed_method]
    
    print("Original")
    print(og)
    print("Suspicious")
    print(sus)

    C = {}
    paper_parameters = ["title", "ps_obj", "keywords", "introduction",
                        "proposed_method"]
    noOfterms = ['candidate_set', '2termset', '3termset']

    for i, param in enumerate(paper_parameters):
        temp1, temp2, temp3 = taking_input(sus[i], og[i])
        C[param + '_' + noOfterms[0]] = temp1
        C[param + '_' + noOfterms[1]] = temp2
        C[param + '_' + noOfterms[2]] = temp3
    
    pairwise_comparisons ={('title', 'ps_obj'): 7, ('title', 'keywords'): 7, ('title', 'introduction'): 9, ('title', 'proposed_method'): 8, 
                         ('ps_obj', 'keywords'): 1, ('ps_obj', 'introduction'): 5, ('ps_obj', 'proposed_method'): 3,
                         ('keywords', 'introduction'): 5, ('keywords', 'proposed_method'): 3,
                         ('introduction', 'proposed_method'): 0.5}

    # matrix = np.array([[0.56,0.64,0.63,0.33,0.45,0.43,0.61],
    #                    [0.07,0.09,0.09,0.18,0.17,0.16,0.08],
    #                    [0.07,0.09,0.09,0.18,0.17,0.16,0.08],
    #                    [0.06,0.01,0.03,0.03,0.02,0.02,0.02],
    #                    [0.06,0.03,0.03,0.07,0.05,0.05,0.04],
    #                    [0.06,0.03,0.03,0.07,0.05,0.05,0.04],
    #                    [0.07,0.09,0.09,0.11,0.05,0.1,0.08]])
    
    # weights_check,consistency_ratio = pairwise.eigenvector(matrix)
    # print("Consistency ratio:", consistency_ratio)

    pairwise_comparisons2={('candidate_set', '2termset'): 0.14, ('candidate_set', '3termset'): 0.11, ('2termset', '3termset'):0.14}
    compare = ahpy.Compare(name='compare',comparisons= pairwise_comparisons, precision=3,random_index='saaty')
    compare2 = ahpy.Compare(name='compare2',comparisons= pairwise_comparisons2, precision=3,random_index='saaty')
    weights = compare.target_weights
    weights2 = compare2.target_weights

    weights2 = dict(reversed(list(weights2.items())))
    similarity_score = 0
    sus = sus_title + sus_ps_obj + sus_keywords + sus_introduction + sus_proposed_method
    sus_words = sus.split()
    suslen = len(sus_words)
    for i in weights.keys():
        for j in weights2.keys():
            similarity_score += weights[i] * weights2[j] * C[i + '_' + j]
    wk = sum(weights.values()) + sum(weights2.values())
    similarity_score = similarity_score / (0.05*suslen)
    print(similarity_score)
    return similarity_score

# API's of proposed methodology 

app = FastAPI()
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Info(BaseModel):
    og: dict
    sus: dict
    type: int

class urlresponse(BaseModel):
    url: str
    similarity: float

class Info1(BaseModel):
    sus: dict
    type: int
    apikey: str

@app.post("/test/")
def func():
    return {"message": "Hello World"}


@app.post("/level0GooglePlagiarism/")
async def func(info1:Info1):

    info1 = info1.dict()

    print("-------------------------", info1)
    try: 
        google_similarity_score, matched_url = google_search_result(info1['sus'],info1['type'],info1['apikey'])
        # create urlresponse object list and return it
        urlresponse_list = []
        for i,j in matched_url.items():
            urlresponse_list.append(urlresponse(url=i, similarity=j))
    except:
        google_similarity_score = 0
        urlresponse_list = []
    return {"google_similarity_score": google_similarity_score, "urlresponse_list": urlresponse_list}   

@app.post("/level1ReferencesPlagiarism/")
async def func(info:Info):
    info = info.dict()
    score = level1_check(info['sus'], info['og']);
    return score

@app.post("/level2CheckPlagiarism/")
async def mainfunction(info: Info):

    info = info.dict()
    # print("-------------------------", info)
    # Type 1 is file upload else its normal
    similarity_score = printing_similarity(info['og'], info['sus'], info['type'])
    # , "google_similarity_score": google_similarity_score
    return {"similarity_score": similarity_score}