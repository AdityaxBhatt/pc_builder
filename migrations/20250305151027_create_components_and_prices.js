/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
    .createTable('components', (table) => {
      table.increments('id').primary(); // Auto-incrementing primary key
      table.string('name').notNullable(); // Component name (e.g., "Ryzen 5 5600X")
      table
        .enu('category', ['CPU', 'GPU', 'Motherboard', 'RAM', 'Storage', 'PSU', 'Case', 'Cooling'])
        .notNullable(); // Enum for category
      table.string('brand'); // Brand of the component (e.g., "AMD")
      table.string('model'); // Model name (e.g., "5600X")
      table.string('socket_type'); // For CPU & motherboard compatibility
      table.string('chipset'); // Only relevant for motherboards
      table.string('memory_type'); // Only relevant for RAM
      table.integer('wattage'); // For PSU & GPU
      table.string('storage_type'); // HDD, SSD, NVMe (for storage)
      table.string('size'); // For motherboards & cases (e.g., ATX, Micro-ATX)
      table.boolean('is_fan_included').defaultTo(false); // Only for CPUs
      table.timestamp('created_at').defaultTo(knex.fn.now()); // Auto-timestamp
    })
    .createTable('prices', (table) => {
      table.increments('id').primary(); // Auto-incrementing primary key
      table.integer('component_id').references('id').inTable('components').onDelete('CASCADE'); // Foreign key (if component is deleted, delete its prices)
      table.string('retailer').notNullable(); // Retailer (Amazon, Newegg, etc.)
      table.decimal('price', 10, 2).notNullable(); // Price with 2 decimal places
      table.text('affiliate_link'); // Link to buy the product
      table.timestamp('last_updated').defaultTo(knex.fn.now()); // Auto timestamp
    });
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('prices').dropTableIfExists('components');
};
