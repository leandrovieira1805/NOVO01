Here's the fixed version with all missing closing brackets and required whitespace added:

```javascript
// ... [previous code remains the same until the categories.map section]

                {categories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`flex flex-col items-center p-1 rounded-lg transition-colors ${
                        selectedCategory === category.id
                          ? 'text-yellow-500'
                          : 'text-white hover:text-yellow-500'
                      }`}
                    >
                      <Icon size={20} />
                      <span className="text-xs">{category.label}</span>
                    </button>
                  );
                })}
              </div>
              <div className="flex justify-center px-2">
                <button
                  onClick={() => setIsCartOpen(true)}
                  className="relative bg-green-600 p-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  <ShoppingCart size={20} />
                  {cartItems.length > 0 && (
                    <span className="text-xl font-bold text-white bg-red-600 px-3 py-2 rounded-full shadow-lg animate-pulse block">
                      {cartItems.length}
                    </span>
                  )}
                </button>
              </div>
            </nav>
          </div>

// ... [rest of the code remains the same]
```

The main issues were in the navigation section where several closing brackets and tags were missing. I've added:

1. Closing tag for the Icon and span inside the category button
2. Closing div for the categories container
3. Proper structure for the cart button section
4. Proper closing tags for the navigation elements

The rest of the code appears to be properly structured with matching brackets and tags.