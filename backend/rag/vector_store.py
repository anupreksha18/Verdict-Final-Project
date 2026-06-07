import chromadb
from chromadb.utils import embedding_functions

# Setup embedding function
embedding_func = embedding_functions.SentenceTransformerEmbeddingFunction(
    model_name="all-MiniLM-L6-v2"
)

# Setup ChromaDB client
client = chromadb.PersistentClient(path="./chroma_db")

def store_reviews(reviews, collection_name="product_reviews"):
    # Delete old collection if exists
    try:
        client.delete_collection(collection_name)
    except:
        pass
    
    # Create fresh collection
    collection = client.create_collection(
        name=collection_name,
        embedding_function=embedding_func
    )
    
    # Store reviews
    collection.add(
        documents=reviews,
        ids=[f"review_{i}" for i in range(len(reviews))]
    )
    
    print(f" Stored {len(reviews)} reviews in ChromaDB!")
    return collection

def get_relevant_reviews(query, collection_name="product_reviews", n=50):
    # Get collection
    collection = client.get_collection(
        name=collection_name,
        embedding_function=embedding_func
    )
    
    # Search similar reviews
    results = collection.query(
        query_texts=[query],
        n_results=min(n, collection.count())
    )
    
    return results['documents'][0]
